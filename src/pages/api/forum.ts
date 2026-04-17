/**
 * Forum Q&A API endpoint — serves questions from D1.
 *
 * GET /api/forum
 *   ?service=Breast+Augmentation           (filter by service)
 *   ?approved=true                         (approved only, default)
 *   ?page=1&limit=10                       (pagination)
 *
 * Returns JSON: { questions: ForumQuestion[], total: number, page: number, limit: number }
 */

import type { APIRoute } from "astro";

let getDB: () => any;
try {
  const { env } = await import("cloudflare:workers");
  getDB = () => (env as any).DB;
} catch {
  getDB = () => null;
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const service = url.searchParams.get("service");
  const approved = url.searchParams.get("approved") !== "false";
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") || "10")));
  const offset = (page - 1) * limit;

  try {
    const DB = getDB();
    if (!DB) {
      return new Response(JSON.stringify({ error: "Database not available. Run with wrangler dev for D1 access." }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }

    const conditions: string[] = [];
    const params: any[] = [];

    if (approved) {
      conditions.push("approved = 1");
    }
    if (service) {
      conditions.push("service LIKE ?");
      params.push(`%${service}%`);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const countResult = await DB.prepare(
      `SELECT COUNT(*) as total FROM forum_questions ${where}`
    ).bind(...params).first() as { total: number } | null;

    const questions = await DB.prepare(
      `SELECT * FROM forum_questions ${where} ORDER BY sort ASC, id DESC LIMIT ? OFFSET ?`
    ).bind(...params, limit, offset).all();

    return new Response(
      JSON.stringify({
        questions: questions.results || [],
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
    console.error("Forum API error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
