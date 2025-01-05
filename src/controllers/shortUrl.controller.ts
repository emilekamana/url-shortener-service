import { Request, Response } from "express";
import { collections } from "../services/database.service.ts";
import ShortUrl from "../models/shortUrl.model.ts";

export class ShortUrlController {
  // Method to shorten a URL
  public static async shorten(req: Request, res: Response) {
    try {
      const { originalUrl } = req.body;

      // Create a new ShortUrl instance
      const shortUrl = new ShortUrl(originalUrl);

      // Insert the short URL into the database
      const result = await collections!.shortUrls!.insertOne(shortUrl);

      // Return success or failure response
      result
        ? res.status(201).json({
            message: `Successfully created a new shortURL`,
            shortCode: shortUrl.shortCode,
          })
        : res.status(500).send("Failed to create a new shortURL");
    } catch (error) {
      console.error(error);
      res.status(400).send((error as any).message);
    }
  }

  // Method to redirect to the original URL
  public static async redirectToFullURL(req: Request, res: Response): Promise<any> {
    const shortCode = req.params.shortCode;

    try {
      // Find the short URL by its code
      const query = { shortCode };
      const shortURL = (await collections!.shortUrls!.findOne(query)) as ShortUrl;

      if (!shortURL) {
        return res.status(404).json({ message: "Short URL not found" });
      }

      // Increment the click count
      shortURL.clicks++;
      await collections!.shortUrls!.findOneAndUpdate(query, {
        $set: { clicks: shortURL.clicks },
      });

      // Redirect to the original URL
      res.redirect(shortURL.originalUrl);
    } catch (error) {
      res.status(404).send(
        `Unable to find matching document with shortCode: ${req.params.shortCode}`
      );
    }
  }

  // Method to get stats of a short URL
  public static async getStats(req: Request, res: Response) {
    const shortCode = req.params.shortCode;

    try {
      // Find the short URL by its code
      const query = { shortCode };
      const shortURL = (await collections!.shortUrls!.findOne(query)) as ShortUrl;

      if (shortURL) {
        res.status(200).json({ clicks: shortURL.clicks });
      } else {
        res.status(404).json({ message: "Short URL not found" });
      }
    } catch (error) {
      res.status(404).send(
        `Unable to find matching document with shortCode: ${req.params.shortCode}`
      );
    }
  }

  // Method to delete a specific short URL
  public static async deleteShortURL(req: Request, res: Response) {
    const shortCode = req.params.shortCode;

    try {
      // Delete the short URL by its code
      const query = { shortCode };
      const result = await collections!.shortUrls!.deleteOne(query);

      // Return success or not found response
      if (result && result.deletedCount) {
        res.status(202).send({ message: "Short URL deleted" });
      } else {
        res.status(404).send(`Short URL not found: ${shortCode}`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send((error as any).message);
    }
  }

  // Method to delete all short URLs
  public static async deleteAllShortURLs(req: Request, res: Response) {
    try {
      // Delete all documents in the collection
      const result = await collections!.shortUrls!.deleteMany({});

      // Return the count of deleted documents or not found response
      if (result && result.deletedCount) {
        res.status(202).send({ message: `Deleted ${result.deletedCount} document(s)` });
      } else {
        res.status(404).send("No documents found to delete");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send((error as any).message);
    }
  }
}

