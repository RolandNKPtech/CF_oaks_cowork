CREATE TABLE `contact_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`doctor` text DEFAULT '' NOT NULL,
	`source_page` text DEFAULT '' NOT NULL,
	`interested_in` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL,
	`email_sent` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `forum_questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`sort` integer DEFAULT 0 NOT NULL,
	`email` text,
	`question_subject` text NOT NULL,
	`question` text NOT NULL,
	`doctor` text DEFAULT '' NOT NULL,
	`answer_subject` text DEFAULT '' NOT NULL,
	`answer` text DEFAULT '' NOT NULL,
	`service` text DEFAULT '' NOT NULL,
	`images` text DEFAULT '[]' NOT NULL,
	`approved` integer DEFAULT false NOT NULL,
	`is_read` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `gallery_cases` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`attributes` text DEFAULT '{}' NOT NULL,
	`info` text DEFAULT '' NOT NULL,
	`sort` integer DEFAULT 1000 NOT NULL,
	`service` text DEFAULT '[]' NOT NULL,
	`images` text,
	`url` text NOT NULL,
	`meta_title` text DEFAULT '' NOT NULL,
	`meta_description` text DEFAULT '' NOT NULL,
	`display_service` text DEFAULT '' NOT NULL,
	`is_featured` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `gallery_cases_url_unique` ON `gallery_cases` (`url`);--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`message` text NOT NULL,
	`doctor` text DEFAULT '' NOT NULL,
	`rating` integer DEFAULT 5 NOT NULL,
	`is_anonymous` integer DEFAULT false NOT NULL,
	`source` text DEFAULT 'google' NOT NULL,
	`created_at` text DEFAULT '' NOT NULL
);
