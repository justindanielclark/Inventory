import express, { Response, Request, NextFunction } from "express";
import passport from "passport";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.render("login", { user: req.user });
});

router.post("/", (req: Request, res: Response) => {
  console.log('router.post("/login")');
  console.log(req.body);
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/",
  });
});

export default router;
