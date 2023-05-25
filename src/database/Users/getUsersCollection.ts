import { MongoClient, Collection, Document } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export default function getUsersCollection(
  client: MongoClient
): Collection<Document> {
  return client.db(process.env.INVENTORY_DB_NAME).collection("Users");
}
