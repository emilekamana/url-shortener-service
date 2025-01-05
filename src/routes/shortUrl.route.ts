import express, { Router } from "express";
import { ShortUrlController } from "../controllers/shortUrl.controller.ts";
import { validateData } from "../middlewares/validation.middleware.ts";
import { shortenURLSchema } from "../schemas/shortUrl.schema.ts";

const router: Router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     ShortUrl:
 *       type: object
 *       required:
 *        - originalUrl
 *        - shortCode
 *        - clicks
 *        - createdAt
 *        - _id
 *       properties:
 *         originalUrl:
 *           type: string
 *           description: The original url
 *           example: https://www.example.com
 *         shortCode:
 *           type: string
 *           description: The short code for the url
 *           example: abcdef
 *         clicks:
 *           type: number
 *           description: The number of times the short url has been clicked
 *           example: 10
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the short url was created
 *           example: 2022-01-01T00:00:00.000Z
 *         _id:
 *           type: string
 *           description: The id of the document
 *           example: 507f1f77bcf86cd799439011
 *     ShortUrlRequest:
 *       type: object
 *       required:
 *        - originalUrl
 *       properties:
 *         originalUrl:
 *           type: string
 *           description: The original url
 *           example: https://www.example.com
 *   requestBodies:
 *     ShortUrlRequest:
 *       description: The request body for the short url request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShortUrlRequest'
 *   responses:
 *     ShortUrlResponse:
 *       description: The response from the short url request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShortUrl'
 */

/**
 * @swagger
 * /api/shorten:
 *   post:
 *     summary: Shorten the given URL
 *     description: Shorten the given URL and return the short code
 *     tags:
 *      - Short URL
 *     requestBody:
 *       $ref: '#/components/requestBodies/ShortUrlRequest'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/ShortUrlResponse'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/api/shorten",
  validateData(shortenURLSchema),
  ShortUrlController.shorten
);

/**
 * @swagger
 * #/{shortCode}:
 *   get:
 *     summary: Redirect to the original URL
 *     description: Redirect to the original URL with the given short code
 *     tags:
 *      - Short URL
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The short code for the url
 *     responses:
 *       302:
 *         description: Redirect to the original URL
 *       404:
 *         description: Short URL not found
 */
router.get("/:shortCode", ShortUrlController.redirectToFullURL);

/**
 *@swagger
 * /api/stats/{shortCode}:
 *   get:
 *     summary: Get the stats for the given short code
 *     description: Get the stats for the given short code
 *     tags:
 *      - Short URL
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The short code for the url
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ShortUrlResponse'
 *       404:
 *         description: Short URL not found
 */
router.get("/api/stats/:shortCode", ShortUrlController.getStats);

/**
 * @swagger
 * /api/delete/{shortCode}:
 *   delete:
 *     summary: Delete the given short url
 *     description: Delete the given short url
 *     tags:
 *      - Short URL
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The short code for the url
 *     responses:
 *       202:
 *         description: Short URL deleted
 *       404:
 *         description: Short URL not found
 */
router.delete("/api/delete/:shortCode", ShortUrlController.deleteShortURL);

/**
 * @swagger
 * /api/delete-all:
 *   delete:
 *     summary: Delete all short urls
 *     description: Delete all short urls
 *     tags:
 *      - Short URL
 *     responses:
 *       202:
 *         description: All short urls deleted
 *       500:
 *         description: Internal Server Error
 *
 */
router.delete("/api/delete-all", ShortUrlController.deleteAllShortURLs);

export default router;
