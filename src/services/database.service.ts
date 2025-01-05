import dotenv from "dotenv";
import * as mongoDB from "mongodb";

export const collections: { shortUrls?: mongoDB.Collection } = {};

/**
 * Connect to the MongoDB database.
 * @returns {Promise<void>} - A promise that resolves when the connection is established.
 */
export async function connectToDatabase(): Promise<void> {
  dotenv.config();

  // Create a new MongoClient instance
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING as string
  );

  // Connect to the database
  await client.connect();

  // Get the database instance
  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  // Get the collection instance
  const urlsCollection: mongoDB.Collection = db.collection(
    process.env.URLS_COLLECTION_NAME as string
  );

  // Store the collection in the collections object
  collections.shortUrls = urlsCollection;

  // Log a success message
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${urlsCollection.collectionName}`
  );
}
