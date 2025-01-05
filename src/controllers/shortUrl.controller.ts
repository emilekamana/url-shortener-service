import { Request, Response } from "express";
import { collections } from "../services/database.service.ts";
import ShortUrl from "../models/shortUrl.model.ts";

const urlsCollection = collections.shortUrls;

export class ShortUrlController {
  public static async shorten(req: Request, res: Response) {
    try {
      const { originalUrl } = req?.body;

      const shortUrl = new ShortUrl(originalUrl);

      const result = await collections!.shortUrls!.insertOne(shortUrl);

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

  public static async redirectToFullURL(
    req: Request,
    res: Response
  ): Promise<any> {
    const shortCode = req?.params?.shortCode;

    try {
      const query = { shortCode: shortCode };
      var shortURL = (await collections!.shortUrls!.findOne(
        query
      )) as unknown as ShortUrl;

      if (!shortURL) {
        return res.status(404).json({ message: "Short URL not found" });
      }

      shortURL.clicks++;

      await collections!.shortUrls!.findOneAndUpdate(query, {
        $set: { clicks: shortURL.clicks },
      });

      res.redirect(shortURL.originalUrl);
    } catch (error) {
      res
        .status(404)
        .send(
          `Unable to find matching document with shortCode: ${req.params.shortCode}`
        );
    }
  }

  public static async getStats(req: Request, res: Response) {
    const shortCode = req?.params?.shortCode;

    try {
      const query = { shortCode: shortCode };
      const shortURL = (await collections!.shortUrls!.findOne(
        query
      )) as unknown as ShortUrl;

      if (shortURL) {
        res.status(200).json({clicks: shortURL.clicks});
      }
    } catch (error) {
      res
        .status(404)
        .send(
          `Unable to find matching document with shortCode: ${req.params.shortCode}`
        );
    }
  }

  public static async deleteShortURL(req: Request, res: Response) {
    const shortCode = req?.params?.shortCode;

    try {
      const query = { shortCode: shortCode };
      const result = await collections!.shortUrls!.deleteOne(query);

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

  public static async deleteAllShortURLs(req: Request, res: Response) {
    try {
      const result = await collections!.shortUrls!.deleteMany({});

      if (result && result.deletedCount) {
        res
          .status(202)
          .send({ message: `Deleted ${result.deletedCount} document(s)` });
      } else {
        res.status(404).send("No documents found to delete");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send((error as any).message);
    }
  }
}
