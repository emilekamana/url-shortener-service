import dotenv from "dotenv";
import * as mongoDB from "mongodb";

export const collections: { shortUrls?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    dotenv.config();
  
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const urlsCollection: mongoDB.Collection = db.collection(process.env.URLS_COLLECTION_NAME as string);

    collections.shortUrls = urlsCollection;

  
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${urlsCollection.collectionName}`);
  }