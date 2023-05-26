import { User } from "./User";
import { Request } from "express";
import { MongoClient } from "mongodb";

export {};

declare global {
  namespace Express {
    export interface Request {
      signup_secret: string;
    }
  }
}
