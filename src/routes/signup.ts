import express, { Response, Request, NextFunction } from "express";
import UserModel from "../database/models/UserModel";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const renderOptions = {
    user: req.user,
    failureMessages: undefined,
    values: {
      signup_name: "",
      signup_password: "",
      signup_password_confirm: "",
      signup_secret_key: "",
      signup_email: "",
    },
  };
  res.render("signup", renderOptions);
});
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  let failures = 0;
  const failureMessages = {
    signup_name: [] as String[],
    signup_email: [] as String[],
    signup_secret_key: [] as String[],
    signup_password: [] as String[],
  };
  const { signup_name, signup_secret_key, signup_password, signup_password_confirm, signup_email } = req.body;

  if (signup_name.length < 6) {
    failureMessages.signup_name.push("A Username Of At Least 6 Characters Must Be Provided");
  }
  if (signup_secret_key == "") {
    failureMessages.signup_secret_key.push("You Must Provide The Correct Secret Key");
    failures++;
  } else if (signup_secret_key !== process.env.SIGNUP_SECRET) {
    failureMessages.signup_secret_key.push("Secret Key Is Invalid");
    failures++;
  }
  if (signup_password == "") {
    failureMessages.signup_password.push("You Must Provide A Password");
    failures++;
  } else if (signup_password !== signup_password_confirm) {
    failureMessages.signup_password.push("Provided Passwords Must Match");
    failures++;
  }

  if (failures === 0) {
    try {
      const user = new UserModel({
        username: signup_name,
        password: signup_password,
        email: signup_email,
        signupDate: new Date(),
        role: "Base",
      });
      const result = await user.save();
      console.log(result);
      return res.redirect("/");
    } catch (err) {
      return next(err);
    }
  } else {
    const renderOptions = {
      user: req.user,
      failureMessages,
      values: {
        signup_name,
        signup_password,
        signup_password_confirm,
        signup_secret_key,
        signup_email,
      },
    };
    return res.status(401).render("signup", renderOptions);
  }
});

export default router;
