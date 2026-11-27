/**
 * Learning library schema. A build fails on any entry that breaks it, so a
 * missing summary or a reviewer-less "published" entry never reaches the site.
 *
 * Lifecycle (`status`):
 *   draft        → being written
 *   ai-verified  → scripts/learn/check passed (answers re-derived symbolically)
 *   published    → a person reviewed it; `review` is filled in
 *   needs-update → was published, an error was reported; stays live until fixed
 * Only `published` and `needs-update` are built for production. `npm run dev`
 * shows the rest with a "검수 전" banner and noindex so they can be reviewed.
 */
import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const SUBJECT = z.enum(["calculus", "engineering-math", "physics", "chemistry", "linear-algebra"]);

/** A machine-checkable claim about an answer. See scripts/learn/check.py. */
const check = z.object({
  id: z.string(),
  /** What the check proves, in words, shown to the reviewer. */
  claim: z.string(),
  /** Python/SymPy expression that must evaluate to True. Names from sympy are in scope. */
  sympy: z.string(),
});

const learn = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/learn" }),
  schema: z
    .object({
      subject: SUBJECT,
      unit: z.string(),
      order: z.number().int(),
      title: z.string().min(10).max(70),
      h1: z.string().min(4).max(60),
      description: z.string().min(60).max(160),
      summary: z.array(z.string()).length(3),
      keyword: z.string(),
      level: z.enum(["intro", "core", "advanced"]),
      prerequisites: z.array(reference("learn")).default([]),
      related: z.array(reference("learn")).default([]),
      checks: z.array(check).min(1),
      provenance: z.literal("original"),
      author: z.string(),
      status: z.enum(["draft", "ai-verified", "published", "needs-update"]),
      review: z
        .object({ by: z.string(), credential: z.string().optional(), date: z.coerce.date() })
        .optional(),
      created: z.coerce.date(),
      updated: z.coerce.date(),
    })
    .refine((d) => !["published", "needs-update"].includes(d.status) || d.review, {
      message: "a published entry needs `review` (who checked it and when)",
    }),
});

const guides = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string().min(10).max(70),
    h1: z.string(),
    description: z.string().min(60).max(160),
    author: z.string(),
    status: z.enum(["draft", "published"]),
    created: z.coerce.date(),
    updated: z.coerce.date(),
  }),
});

export const collections = { learn, guides };
