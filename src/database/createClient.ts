import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export default async function createClient(
  MongoURI: string
): Promise<MongoClient> {
  const client = new MongoClient(MongoURI);
  await client
    .connect()
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => console.error(err));

  const gracefulShutdown = () => {
    client.close(false).then(() => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => gracefulShutdown());
  process.on("SIGINT", () => gracefulShutdown());
  process.on("SIGHUP", () => gracefulShutdown());

  return client;
}
