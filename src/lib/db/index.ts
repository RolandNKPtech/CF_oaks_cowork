/**
 * Database client — Drizzle ORM over D1.
 * In local dev: uses wrangler's local D1 simulator (SQLite file).
 * In production: uses Cloudflare D1 edge database.
 */

import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function createDb(d1: any) {
  return drizzle(d1, { schema });
}

export type Database = ReturnType<typeof createDb>;

// Re-export schema for convenience
export * from "./schema";
