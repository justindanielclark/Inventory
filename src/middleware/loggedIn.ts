import { Request, Response, NextFunction } from "express";
export default async function loggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return next();
}
