/**
 * Better Auth configuration — factory pattern for Cloudflare Workers.
 *
 * D1 bindings are only available at request time, so we can't create
 * a singleton auth instance at module scope. Instead, `createAuth(db)`
 * returns a fresh instance bound to the current request's D1 handle.
 *
 * Uses better-auth/minimal (Drizzle adapter, no Kysely overhead).
 */

import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./db/schema";

export function createAuth(d1: any, options?: { secret?: string; baseURL?: string }) {
  const db = drizzle(d1, { schema });

  return betterAuth({
    baseURL: options?.baseURL || "http://localhost:8788",
    secret: options?.secret || "dev-secret-change-me-in-production",

    database: drizzleAdapter(db, {
      provider: "sqlite",
      usePlural: true, // our schema uses plural table names (users, sessions, etc.)
    }),

    emailAndPassword: {
      enabled: true,
      // Require strong passwords
      minPasswordLength: 8,
    },

    session: {
      // 30 days
      expiresIn: 60 * 60 * 24 * 30,
      // Refresh when 1 day or less remains
      updateAge: 60 * 60 * 24,
    },

    plugins: [
      admin({
        defaultRole: "user",
        adminRoles: ["admin"],
      }),
    ],

    // Trusted origins for CSRF
    trustedOrigins: [
      "http://localhost:8788",
      "http://localhost:4321",
      "https://theoaksplasticsurgery.com",
    ],
  });
}

export type Auth = ReturnType<typeof createAuth>;
