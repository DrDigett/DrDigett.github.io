import { defineCollection, z } from 'astro:content';

const relatos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().regex(/^\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}$/, 'Formato dia/mes/año requerido (ej: 13-08-2025)'),
    image: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const articulos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().regex(/^\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}$/, 'Formato dia/mes/año requerido (ej: 13-08-2025)'),
    image: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { relatos, articulos };
