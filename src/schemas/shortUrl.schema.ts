import { z } from 'zod';

/**
 * The schema for the ShortUrlRequest object.
 */
export const shortenURLSchema = z.object({
  /**
   * The original URL to shorten check to see if it's valid.
   */
  originalUrl: z.string().url("Invalid URL"),
});
