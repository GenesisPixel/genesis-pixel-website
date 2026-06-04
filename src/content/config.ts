import { defineCollection, z } from 'astro:content';

const lessonSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(['css', 'svg', 'canvas', 'threejs', 'gsap', 'webgl']),
  level: z.enum(['basico', 'intermedio', 'avanzado']),
  duration: z.string(),
  tags: z.array(z.string()),
  pubDate: z.coerce.date(),
  order: z.number(),
  draft: z.boolean().default(false),
});

export type Lesson = z.infer<typeof lessonSchema>;

export const collections = {
  lessons: defineCollection({
    type: 'content',
    schema: lessonSchema,
  }),
};
