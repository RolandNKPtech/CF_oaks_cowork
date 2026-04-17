/**
 * Contact form API endpoint — validates input, checks Turnstile,
 * saves to D1, and sends email via SendGrid.
 *
 * POST /api/contact
 * Body: { name, email, phone, message, doctor, sourcePage, interestedIn, "cf-turnstile-response"? }
 */

import type { APIRoute } from "astro";
import * as v from "valibot";
import { verifyTurnstile } from "../../lib/turnstile";

export const prerender = false;

// ─── Input schema ────────────────────────────────────────────────────
const ContactSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1, "Name is required"), v.maxLength(200)),
  email: v.pipe(v.string(), v.trim(), v.email("Invalid email address"), v.maxLength(320)),
  phone: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(30)), ""),
  message: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(5000)), ""),
  doctor: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(100)), ""),
  sourcePage: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(200)), ""),
  interestedIn: v.optional(v.pipe(v.string(), v.trim(), v.maxLength(200)), ""),
  "cf-turnstile-response": v.optional(v.string(), ""),
});

let getEnv: () => any;
try {
  const { env } = await import("cloudflare:workers");
  getEnv = () => env;
} catch {
  getEnv = () => ({});
}

export const POST: APIRoute = async ({ request }) => {
  const json = (s: any, status = 200) =>
    new Response(JSON.stringify(s), { status, headers: { "Content-Type": "application/json" } });

  try {
    const cfEnv = getEnv();
    const DB = cfEnv?.DB;
    if (!DB) return json({ error: "Database not available" }, 503);

    // Parse + validate input
    const raw = await request.json().catch(() => ({}));
    const result = v.safeParse(ContactSchema, raw);

    if (!result.success) {
      const firstIssue = result.issues[0];
      return json({ success: false, message: firstIssue?.message || "Invalid input" }, 400);
    }

    const data = result.output;

    // Turnstile verification
    const turnstileResult = await verifyTurnstile(
      data["cf-turnstile-response"],
      cfEnv?.TURNSTILE_SECRET,
      request.headers.get("CF-Connecting-IP") || undefined
    );

    if (!turnstileResult.success) {
      return json({ success: false, message: "Bot verification failed. Please try again." }, 403);
    }

    const createdAt = new Date().toISOString();

    // Save to D1
    await DB.prepare(
      `INSERT INTO contact_submissions (name, email, phone, message, doctor, source_page, interested_in, created_at, email_sent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`
    ).bind(
      data.name, data.email, data.phone, data.message,
      data.doctor, data.sourcePage, data.interestedIn, createdAt
    ).run();

    // Send email via SendGrid
    let emailSent = false;
    const SENDGRID_API_KEY = cfEnv?.SENDGRID_API_KEY;
    if (SENDGRID_API_KEY) {
      try {
        const sgResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${SENDGRID_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: cfEnv?.NOTIFICATION_EMAIL || "info@theoaksplasticsurgery.com" }],
              subject: `New Contact Form: ${data.name} — ${data.sourcePage || "Website"}`,
            }],
            from: {
              email: cfEnv?.FROM_EMAIL || "noreply@theoaksplasticsurgery.com",
              name: "TOPS Website",
            },
            content: [{
              type: "text/html",
              value: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(data.phone) || "N/A"}</p>
                <p><strong>Doctor:</strong> ${escapeHtml(data.doctor) || "No preference"}</p>
                <p><strong>Interested In:</strong> ${escapeHtml(data.interestedIn) || "N/A"}</p>
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(data.message) || "N/A"}</p>
                <p><strong>Page:</strong> ${escapeHtml(data.sourcePage) || "N/A"}</p>
                <p><strong>Time:</strong> ${createdAt}</p>
              `,
            }],
          }),
        });
        emailSent = sgResponse.ok;
      } catch (e) {
        console.error("SendGrid error:", e);
      }

      if (emailSent) {
        await DB.prepare(
          `UPDATE contact_submissions SET email_sent = 1 WHERE created_at = ? AND email = ?`
        ).bind(createdAt, data.email).run();
      }
    }

    return json({ success: true, message: "Thank you! We have received your message.", emailSent });
  } catch (err) {
    console.error("Contact API error:", err);
    return json({ success: false, message: "Something went wrong. Please try again." }, 500);
  }
};

/** Escape HTML to prevent XSS in email content */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
