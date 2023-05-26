//UTILS
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import database from "./database/database";
//ROUTES
import login_route from "./routes/login";
import signup_route from "./routes/signup";
//DEFAULTS and CONSTS
dotenv.config();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || "sosecretive";

async function main() {
  const app = express();
  const db = await database.createConnection();
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      },
    })
  );
  passport.use(
    new LocalStrategy(async function verify(username, password, done) {
      try {
        const user = await database.UserModel.findOne({ username });
        if (!user) {
          return done(null, false, { message: "Incorrect Username" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(async function (id, done) {
    try {
      const user = await database.UserModel.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static("public"));

  //ROUTES
  app.get("/", (req, res) => {
    return res.render("index", { user: req.user });
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
