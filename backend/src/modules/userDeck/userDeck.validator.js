import { z } from 'zod';

export const createDeckSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Tên bộ thẻ không được để trống')
    .max(100, 'Tên bộ thẻ tối đa 100 ký tự'),
  description: z.string().trim().max(500).optional(),
});
