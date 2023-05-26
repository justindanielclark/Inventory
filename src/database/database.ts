import dotenv from "dotenv";
import mongoose, { Connection } from "mongoose";
import UserModel from "./models/UserModel";
dotenv.config();

async function createConnection(): Promise<Connection> {
  console.log("Setting Up Connection to Database...");
  await mongoose
    .connect(process.env.MONGO_URI as string, {
      dbName: "MonsterHunter_Inventory",
    })
    .then(() => {
      console.log("Connected to Database...");
    });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "mongo connection error"));

  const gracefulShutdown = () => {
    db.close(false).then(() => {
      console.log("MongoDB Connection Successfully Closed...");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => gracefulShutdown());
  process.on("SIGINT", () => gracefulShutdown());
  process.on("SIGHUP", () => gracefulShutdown());

  return mongoose.connection;
}

export default {
  createConnection,
  UserModel,
};
