import { Request } from "express";
import { MongoClient } from "mongodb";

export {};

declare global {
  namespace Express {
    export interface Request {
      signup_secret: string;
      salt: string;
      db_name: string;
      db: MongoClient;
    }
  }
}
