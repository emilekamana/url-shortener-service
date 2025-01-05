import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import router from "./routes/shortUrl.route.ts";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { connectToDatabase } from "./services/database.service.ts";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

connectToDatabase()
  .then(() => {
    app.use(express.json());

    app.get("/", (req: Request, res: Response) => {
      res.send("URL Shortening Service API");
    });

    app.use("", router);

    const swaggerOptions = {
      swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "URL shortnener Service API",
          version: "1.0.0",
        },
        servers: [
          {
            url: "http://localhost:3000",
          },
          {
            url: "https://url-shortener-service-kz5q.onrender.com",
          }
        ],
      },
      apis: ["./src/routes/*.ts"],
    };
    const swaggerDocs = swaggerJsdoc(swaggerOptions);
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit();
  });