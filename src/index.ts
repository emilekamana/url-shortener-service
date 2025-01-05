import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import router from "./routes/shortUrl.route.ts";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { connectToDatabase } from "./services/database.service.ts";

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app: Application = express();
const port = process.env.PORT || 3000;

// Connect to the MongoDB database
connectToDatabase()
  .then(() => {
    // Middleware to parse JSON request bodies
    app.use(express.json());

    // Define a simple route for the root URL
    app.get("/", (req: Request, res: Response) => {
      res.send("URL Shortening Service API");
    });

    // Use the short URL router for handling routes
    app.use("", router);

    // Swagger configuration options
    const swaggerOptions = {
      swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "URL Shortener Service API",
          version: "1.0.0",
        },
        servers: [
          {
            url: "http://localhost:3000",
          },
          {
            url: "https://url-shortener-service-kz5q.onrender.com",
          },
        ],
      },
      apis: ["./src/routes/*.ts"],
    };

    // Initialize Swagger JSDoc
    const swaggerDocs = swaggerJsdoc(swaggerOptions);

    // Serve Swagger UI documentation at /api/docs
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    // Log an error message and exit the process if database connection fails
    console.error("Error connecting to the database:", error);
    process.exit();
  });
