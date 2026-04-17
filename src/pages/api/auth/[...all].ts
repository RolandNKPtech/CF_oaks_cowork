/**
 * Better Auth catch-all API route.
 *
 * Handles all /api/auth/* requests:
 *   POST /api/auth/sign-up/email    — register
 *   POST /api/auth/sign-in/email    — login
 *   GET  /api/auth/get-session      — current session
 *   POST /api/auth/sign-out         — logout
 *   + admin plugin routes under /api/auth/admin/*
 *
 * Must NOT be prerendered (it's a dynamic API).
 */

import type { APIRoute } from "astro";
import { createAuth } from "../../../lib/auth";

export const prerender = false;

let getEnv: () => any;
try {
  const { env } = await import("cloudflare:workers");
  getEnv = () => env;
} catch {
  getEnv = () => ({});
}

const handleAuth: APIRoute = async ({ request }) => {
  const cfEnv = getEnv();
  const DB = cfEnv?.DB;

  if (!DB) {
    return new Response(
      JSON.stringify({ error: "Database not available" }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const auth = createAuth(DB, {
    secret: cfEnv?.BETTER_AUTH_SECRET || "dev-secret-change-me-in-production",
    baseURL: new URL(request.url).origin,
  });

  return auth.handler(request);
};

// Better Auth needs all HTTP methods
export const GET = handleAuth;
export const POST = handleAuth;
