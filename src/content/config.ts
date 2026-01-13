import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    date: z.date(),
    github: z.string().optional(),
    external: z.string().optional(),
    image: image().optional(),
    isPrivate: z.boolean().optional(),
    privateReason: z.string().optional(),
    links: z.array(z.object({
      label: z.string(),
      url: z.string()
    })).optional()
  }),
});

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    range: z.string(),
    url: z.string().optional(),
    summary: z.string(),
    achievements: z.array(z.string()),
    tech: z.array(z.string()),
    date: z.date() // Used for sorting
  }),
});

const education = defineCollection({
  type: 'content',
  schema: z.object({
    degree: z.string(),
    institution: z.string(),
    location: z.string().optional(),
    range: z.string(),
    url: z.string().optional(),
    summary: z.string().optional(),
    achievements: z.array(z.string()),
    date: z.date() // Used for sorting
  }),
});

const certifications = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    issuer: z.string(),
    id: z.string().optional(),
    dateStr: z.string(), // Keep original string for display if needed, or just use date
    url: z.string().optional(),
    attachment: z.string().optional(),
    image: image().optional(),
    date: z.date() // Used for sorting
  }),
});

export const collections = { projects, experience, education, certifications };
