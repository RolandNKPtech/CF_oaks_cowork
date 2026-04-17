# Changelog

All notable changes to the Oaks Plastic Surgery website will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

## [0.3.0] — 2026-04-17

### Added — Step 5: Admin Authentication (Better Auth v1.6)
- Better Auth config factory (src/lib/auth.ts) — per-request instance for CF Workers
- 4 auth tables: users, sessions, accounts, verifications (Drizzle schema + migration)
- Auth API catch-all route (src/pages/api/auth/[...all].ts) — sign-up, sign-in, sign-out, session, admin endpoints
- Astro middleware (src/middleware.ts) — session population, /admin/* protection, CSP headers
- Admin login page (src/pages/admin/login.astro) — email + password with client-side handling
- Admin dashboard (src/pages/admin/index.astro) — stats, recent contacts, sign-out
- Admin user seeding script (scripts/seed-admin.sh) — creates auth tables + instructions for admin user

### Added — Step 9: Blog Migration
- WordPress-to-Markdown migration script (scripts/migrate-blog.py) — extracts 7 published posts from SQL dump
- 7 blog posts as Astro content collection Markdown files (tummy tuck, hair restoration, pricing)
- Content collection config (src/content.config.ts) with typed schema
- Blog listing page (src/pages/blog/index.astro) with date-sorted cards
- Individual blog post pages (src/pages/blog/[slug].astro) with BlogPosting JSON-LD

### Added — Step 10: SEO Layer
- Enhanced SEO component with ogType, jsonLd, publishedTime, modifiedTime, articleAuthor props
- BlogPosting structured data (schema.org) on all blog post pages
- Article OG tags (published_time, modified_time, author) for blog posts
- Sitemap excludes /admin/* routes via filter config

### Added — Step 11: Security Hardening
- Cloudflare Turnstile widget component (src/components/TurnstileWidget.astro)
- Turnstile server-side verification helper (src/lib/turnstile.ts)
- Valibot schema validation on contact form API endpoint
- HTML escaping for email template content (XSS prevention)
- CSP headers: script-src, style-src, img-src, frame-src, font-src, connect-src
- X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy headers
- No-cache headers on admin/auth routes

### Added — Client-Side UI Components
- GallerySlider component — fetches /api/gallery, renders before/after image pairs with navigation
- ForumCarousel component — fetches /api/forum, renders expandable Q&A accordion
- ContactFormHandler component — intercepts form submissions, POSTs to /api/contact
- Wired GallerySlider into breast-augmentation, tummy-tuck, liposuction pages
- Wired ForumCarousel into breast-augmentation, tummy-tuck, liposuction pages
- Added featured gallery + recent Q&A sections to homepage

### Changed
- Contact form uses data-contact-form attribute + Turnstile widget
- Contact API validates with Valibot schema + verifies Turnstile token
- Base layout passes through all SEO props (jsonLd, ogType, publishedTime, etc.)

## [0.2.0] — 2026-04-17

### Added
- HomeLayout with carousel header for homepage (HomeHeader component)
- HeaderWithCTA component for procedure pages with optional CTA button
- CategoryGrid component — reusable category cards with overlay menus
- Staff data module (src/lib/staff.ts) — 30+ staff members across 5 departments
- Categories data module (src/lib/categories.ts) — 7 category groups with all procedure links
- Dr. Danielle Andry bio page with full training history, social links
- Dr. Nandi Wijay bio page with full bio, social links
- About page with practice overview and doctor profiles
- Contact Us page with dual-office info, Google Maps, contact form
- Financing page with CareCredit integration
- 64 procedure/service pages auto-converted from PHP source
- 4 combo procedure pages (360 lipo, breast aug+lift, lift vs reduction, tummy tuck+lipo)
- Privacy policy page
- PHP-to-Astro batch conversion script (scripts/convert-php.py)

### Changed
- Homepage now uses HomeLayout (carousel header) instead of Base layout
- Homepage completed with all sections: doctors, procedures, labiaplasty, mommy makeover, Amazon products, Ask a Question, category grids, video section, staff grid, testimonials placeholder

## [0.1.0] — 2026-04-17

### Added
- Astro 6 project scaffolded with @astrojs/cloudflare adapter v13
- wrangler.toml configured for D1, R2, KV bindings
- Base layout with SEO component (per-page title, description, canonical, OG tags)
- Header component with dynamic background image and H1
- Nav component — full navigation menu ported from PHP (all links updated to clean URLs)
- Footer component with JSON-LD structured data, analytics, social links
- Constants module with site info, phone numbers, "interested in" labels
- Homepage (index.astro) — first 5 sections ported from index.php
- All CSS, JS, images, webfonts copied verbatim from PHP site
- Verification script (scripts/verify.sh)
- Project documentation scaffolding (docs/, CHANGELOG.md)
