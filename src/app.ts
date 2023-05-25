import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";

import database from "./database/database";

import login_route from "./routes/login";
import signup_route from "./routes/signup";
import passport from "passport";

dotenv.config();
const SALT_ROUNDS = 4;
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || "sosecretive";
const SIGNUP_SECRET = process.env.SIGNUP_SECRET || "sosecretive";
const DB_NAME = process.env.INVENTORY_DB_NAME;
const salt = bcrypt.genSaltSync(SALT_ROUNDS);

async function main() {
  const app = express();
  const dbClient = await database.createClient(process.env.MONGO_URI as string);

  app.set("db", dbClient);
  app.set("db_name", DB_NAME);
  app.set("signup_secret", SIGNUP_SECRET);
  app.set("salt", salt);
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../views"));

  app.use(
    session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));

  //ROUTES
  app.get("/", (req, res) => {
    return res.render("index", { loggedIn: true });
  });
  app.use("/login", login_route);
  app.use("/signup", signup_route);
  app.get("/success", (req: Request, res: Response) => {
    res.send("success");
  });
  app.use("*", (req: Request, res: Response) => {
    res.sendStatus(404);
  });

  app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
  });
}

main();
