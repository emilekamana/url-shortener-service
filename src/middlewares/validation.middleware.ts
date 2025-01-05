import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';


// Middleware to validate request data against a Zod schema.
export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body against the schema
      schema.parse(req.body);
      // Proceed to the next middleware or route handler if validation passes
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Map and format validation errors
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        // Send a 400 Bad Request response with validation error details
        res.status(400).json({ error: 'Invalid data', details: errorMessages });
      } else {
        // Send a 500 Internal Server Error response for unexpected errors
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}
