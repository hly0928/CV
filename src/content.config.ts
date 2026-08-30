import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    kind: z.enum(['system', 'troubleshooting', 'documentation']),
    role: z.string(),
    period: z.string(),
    stack: z.array(z.string()).default([]),
    artefacts: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        }),
      )
      .default([]),
    authorship: z.enum(['unassisted', 'ai-assisted-prose']).optional(),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work };
