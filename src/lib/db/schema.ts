/**
 * Unified D1 database schema — Drizzle ORM
 * Merges theoaksp_admin + theoaksp_forum + theoaksp_wordpress into one D1 database.
 *
 * Sources:
 *   - patient (admin)    → gallery_cases (before/after gallery)
 *   - question (forum)   → forum_questions (Q&A)
 *   - users/role/perms   → managed by Better Auth (Step 5)
 *   - wp_posts           → Astro content collections (Step 9) — NOT in D1
 *
 * Design decisions:
 *   - JSON fields stored as TEXT (D1 = SQLite, no native JSON column)
 *   - images field stores JSON array of {heading, before, after} objects
 *   - attributes field stores JSON object of filterable patient metadata
 *   - service field stores JSON array of service names
 *   - All timestamps use ISO 8601 text (SQLite has no datetime type)
 *   - Auto-increment integer PKs (SQLite rowid)
 */

import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ─── Gallery Cases (from theoaksp_admin.patient) ─────────────────────

export const galleryCases = sqliteTable("gallery_cases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  /** JSON: { Gender, Doctor, Ethnicity, Age, Height, Weight } */
  attributes: text("attributes").notNull().default("{}"),
  info: text("info").notNull().default(""),
  sort: integer("sort").notNull().default(1000),
  /** JSON array: ["Breast Augmentation Houston", ...] */
  service: text("service").notNull().default("[]"),
  /** JSON array: [{ heading, before, after }, ...] */
  images: text("images"),
  url: text("url").notNull().unique(),
  metaTitle: text("meta_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
  displayService: text("display_service").notNull().default(""),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(true),
});

// ─── Forum Questions (from theoaksp_forum.question) ──────────────────

export const forumQuestions = sqliteTable("forum_questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  sort: integer("sort").notNull().default(0),
  email: text("email"),
  questionSubject: text("question_subject").notNull(),
  question: text("question").notNull(),
  doctor: text("doctor").notNull().default(""),
  answerSubject: text("answer_subject").notNull().default(""),
  /** HTML content */
  answer: text("answer").notNull().default(""),
  service: text("service").notNull().default(""),
  /** JSON array of image paths */
  images: text("images").notNull().default("[]"),
  approved: integer("approved", { mode: "boolean" }).notNull().default(false),
  isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().default(""),
});

// ─── Contact Form Submissions ────────────────────────────────────────

export const contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  message: text("message").notNull().default(""),
  doctor: text("doctor").notNull().default(""),
  /** Page the form was submitted from */
  sourcePage: text("source_page").notNull().default(""),
  /** interested_in from consultation overlay */
  interestedIn: text("interested_in").notNull().default(""),
  createdAt: text("created_at").notNull(),
  /** Whether SendGrid email was sent successfully */
  emailSent: integer("email_sent", { mode: "boolean" }).notNull().default(false),
});

// ─── Reviews / Testimonials ──────────────────────────────────────────
// The PHP site fetched from reviews.regexseo.com API. We'll cache them locally.

export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  message: text("message").notNull(),
  doctor: text("doctor").notNull().default(""),
  rating: integer("rating").notNull().default(5),
  isAnonymous: integer("is_anonymous", { mode: "boolean" }).notNull().default(false),
  source: text("source").notNull().default("google"),
  createdAt: text("created_at").notNull().default(""),
});

// ─── Auth: Users (Better Auth) ──────────────────────────────────────

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  /** Admin plugin fields */
  role: text("role").default("user"),
  banned: integer("banned", { mode: "boolean" }).default(false),
  banReason: text("ban_reason"),
  banExpires: integer("ban_expires", { mode: "timestamp" }),
});

// ─── Auth: Sessions (Better Auth) ───────────────────────────────────

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => users.id),
  /** Admin plugin: impersonation tracking */
  impersonatedBy: text("impersonated_by"),
});

// ─── Auth: Accounts (Better Auth) ───────────────────────────────────

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => users.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// ─── Auth: Verifications (Better Auth) ──────────────────────────────

export const verifications = sqliteTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

// ─── Type helpers ────────────────────────────────────────────────────

export type GalleryCase = typeof galleryCases.$inferSelect;
export type NewGalleryCase = typeof galleryCases.$inferInsert;
export type ForumQuestion = typeof forumQuestions.$inferSelect;
export type NewForumQuestion = typeof forumQuestions.$inferInsert;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Account = typeof accounts.$inferSelect;
