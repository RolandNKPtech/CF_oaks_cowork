/// <reference types="astro/client" />

type ENV = {
  DB: D1Database;
  MEDIA: R2Bucket;
  SESSIONS: KVNamespace;
  SENDGRID_API_KEY: string;
  TURNSTILE_SECRET: string;
  BETTER_AUTH_SECRET: string;
  NOTIFICATION_EMAIL: string;
  FROM_EMAIL: string;
};

type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;

declare namespace App {
  interface Locals extends Runtime {
    user?: Record<string, any> | null;
    session?: Record<string, any> | null;
  }
}
