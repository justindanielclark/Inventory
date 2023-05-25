import { Request } from "express";
export default interface ModifiedRequest extends Request {
  signup_secret: string;
}
