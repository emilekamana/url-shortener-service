import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./services/database.service";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

connectToDatabase().then(() => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Express & TypeScript Server");
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((error) => {
  console.error("Error connecting to the database:", error);
  process.exit();
}); 
