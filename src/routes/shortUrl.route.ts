import express, { Request, Response, Router } from "express";
import { ShortUrlController } from "../controllers/shortUrl.controller.ts";

const router: Router = express.Router();

router.post("/api/shorten", ShortUrlController.shorten);

router.get("/:shortCode", ShortUrlController.redirectToFullURL);

router.get("/api/stats/:shortCode", ShortUrlController.getStats);

router.delete("/api/delete/:shortCode", ShortUrlController.deleteShortURL);

router.delete("/api/delete-all", ShortUrlController.deleteAllShortURLs);

export default router;
