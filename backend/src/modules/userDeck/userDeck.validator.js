import { z } from 'zod';

export const listMyDecksSchema = z.object({
  q: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const createDeckSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Tên bộ thẻ không được để trống')
    .max(100, 'Tên bộ thẻ tối đa 100 ký tự'),
  description: z.string().trim().max(500).optional(),
});
