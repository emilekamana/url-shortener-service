import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import * as mongoDB from "mongodb";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

export async function connectToDatabase () {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
          
  await client.connect();
      
  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  console.log(`Successfully connected to database: ${db.databaseName}`);
}

try {
  connectToDatabase(); 
} catch (error) {
  console.log('error during connecting to mongo: ');
  console.error(error);
}


app.get("/", (req: Request, res: Response) => {
  res.send("Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
