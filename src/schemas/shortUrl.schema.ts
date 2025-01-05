import { z } from 'zod';

export const shortenURLSchema = z.object({
  originalUrl: z.string().url("Invalid URL"),
});