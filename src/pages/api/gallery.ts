/**
 * Gallery API endpoint — serves before/after cases from D1.
 *
 * GET /api/gallery
 *   ?service=Breast+Augmentation+Houston   (filter by service)
 *   ?doctor=Dr.+Danielle+Andry             (filter by doctor)
 *   ?page=1&limit=12                       (pagination)
 *   ?featured=true                         (featured only)
 *
 * Returns JSON: { cases: GalleryCase[], total: number, page: number, limit: number }
 */

import type { APIRoute } from "astro";

// Astro v6 + @astrojs/cloudflare: use cloudflare:workers for bindings
let getDB: () => any;
try {
  // Production / wrangler dev: import from cloudflare:workers
  const { env } = await import("cloudflare:workers");
  getDB = () => (env as any).DB;
} catch {
  // Fallback: won't have DB in plain astro dev without wrangler
  getDB = () => null;
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const service = url.searchParams.get("service");
  const doctor = url.searchParams.get("doctor");
  const featured = url.searchParams.get("featured");
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "12")));
  const offset = (page - 1) * limit;

  try {
    const DB = getDB();
    if (!DB) {
      return new Response(JSON.stringify({ error: "Database not available. Run with wrangler dev for D1 access." }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Build WHERE conditions
    const conditions: string[] = [];
    const params: any[] = [];

    if (service) {
      conditions.push("service LIKE ?");
      params.push(`%${service}%`);
    }
    if (doctor) {
      conditions.push("attributes LIKE ?");
      params.push(`%${doctor}%`);
    }
    if (featured === "true") {
      conditions.push("is_featured = 1");
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // Get total count
    const countResult = await DB.prepare(
      `SELECT COUNT(*) as total FROM gallery_cases ${where}`
    ).bind(...params).first() as { total: number } | null;

    // Get page of results
    const cases = await DB.prepare(
      `SELECT * FROM gallery_cases ${where} ORDER BY sort ASC, id DESC LIMIT ? OFFSET ?`
    ).bind(...params, limit, offset).all();

    return new Response(
      JSON.stringify({
        cases: cases.results || [],
        total: countResult?.total || 0,
        page,
        limit,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300",
        },
      }
    );
  } catch (err) {
    console.error("Gallery API error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
