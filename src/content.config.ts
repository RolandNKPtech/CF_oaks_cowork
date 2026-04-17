/**
 * Astro Content Collections configuration.
 * Defines the blog collection schema for migrated WordPress posts.
 */

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    description: z.string().optional(),
    heroImage: z.string().optional(),
    author: z.string().default("The Oaks Plastic Surgery"),
  }),
});

export const collections = { blog };
