import express, { Response, Request, NextFunction } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.render("login", { loggedIn: false });
});

router.post("/", (req: Request, res: Response) => {
  console.log("Received a post request at login");
  console.log(req.body);
  res.redirect("/");
});

export default router;
