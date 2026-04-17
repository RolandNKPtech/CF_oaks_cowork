/**
 * Astro middleware — handles:
 * 1. Security headers (CSP, X-Frame-Options, etc.)
 * 2. Auth session population (Better Auth)
 * 3. Admin route protection
 */

import { defineMiddleware } from "astro:middleware";
import { createAuth } from "./lib/auth";

let getEnv: () => any;
try {
  const { env } = await import("cloudflare:workers");
  getEnv = () => env;
} catch {
  getEnv = () => ({});
}

// ─── Content Security Policy ────────────────────────────────────────
const CSP = [
  "default-src 'self'",
  // Scripts: self + Turnstile + YouTube + Google Maps + inline (bootstrap/flickity need it)
  "script-src 'self' 'unsafe-inline' challenges.cloudflare.com www.youtube.com maps.googleapis.com cdnjs.cloudflare.com unpkg.com",
  // Styles: self + fonts + inline (component scoped styles)
  "style-src 'self' 'unsafe-inline' fonts.googleapis.com unpkg.com cdnjs.cloudflare.com",
  // Images: self + R2 + data URIs + Google Maps tiles + YouTube thumbs
  "img-src 'self' data: blob: *.r2.cloudflarestorage.com *.googleusercontent.com *.google.com *.googleapis.com *.gstatic.com *.ytimg.com",
  // Frames: YouTube embeds + Google Maps + Turnstile
  "frame-src www.youtube.com www.google.com challenges.cloudflare.com",
  // Fonts: self + Google Fonts
  "font-src 'self' fonts.gstatic.com",
  // Connect: self (API calls) + Turnstile + SendGrid
  "connect-src 'self' challenges.cloudflare.com",
  // Base: self
  "base-uri 'self'",
  // Form actions: self
  "form-action 'self'",
].join("; ");

export const onRequest = defineMiddleware(async (context, next) => {
  const cfEnv = getEnv();
  const DB = cfEnv?.DB;
  const pathname = new URL(context.request.url).pathname;

  // ── Auth session (only if DB available) ──
  if (DB) {
    const auth = createAuth(DB, {
      secret: cfEnv?.BETTER_AUTH_SECRET || "dev-secret-change-me-in-production",
      baseURL: new URL(context.request.url).origin,
    });

    try {
      const session = await auth.api.getSession({
        headers: context.request.headers,
      });
      if (session) {
        context.locals.user = session.user;
        context.locals.session = session.session;
      }
    } catch {
      // No valid session — fine for public pages
    }

    // ── Admin route protection ──
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      if (!context.locals.user) {
        return context.redirect("/admin/login");
      }
      if ((context.locals.user as any)?.role !== "admin") {
        return new Response("Forbidden", { status: 403 });
      }
    }
  }

  // Get the response
  const response = await next();

  // ── Security headers ──
  response.headers.set("Content-Security-Policy", CSP);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // No caching for admin/API pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/auth")) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  }

  return response;
});
