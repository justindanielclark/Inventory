import { render } from "ejs";
import ModifiedRequest from "../types/ModifiedRequest";
import express, { Response, Request, NextFunction } from "express";

const router = express.Router();

type FailureMessages = {
  signup_name: Array<string>;
  signup_secret_key: Array<string>;
  signup_password: Array<string>;
};
type FormValues = {
  signup_name: string;
  signup_secret_key: string;
  signup_password: string;
  signup_password_confirm: string;
};
type RenderOptions = {
  loggedIn: boolean;
  failureMessages: FailureMessages | undefined;
  values: FormValues;
};

router.get("/", (req: Request, res: Response) => {
  const renderOptions: RenderOptions = {
    loggedIn: false,
    failureMessages: undefined,
    values: {
      signup_name: "",
      signup_password: "",
      signup_password_confirm: "",
      signup_secret_key: "",
    },
  };
  res.render("signup", renderOptions);
});
router.post("/", (req: Request, res: Response) => {
  let failures = 0;
  const failureMessages: FailureMessages = {
    signup_name: [],
    signup_secret_key: [],
    signup_password: [],
  };
  const {
    signup_name,
    signup_secret_key,
    signup_password,
    signup_password_confirm,
  } = req.body;

  if (signup_name.length < 6) {
    failureMessages.signup_name.push(
      "A Username Of At Least 6 Characters Must Be Provided"
    );
  }
  if (signup_secret_key == "") {
    failureMessages.signup_secret_key.push(
      "You Must Provide The Correct Secret Key"
    );
    failures++;
  } else if (signup_secret_key !== req.signup_secret) {
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
    return res.status(200).redirect("/success");
  } else {
    const renderOptions: RenderOptions = {
      loggedIn: false,
      failureMessages,
      values: {
        signup_name,
        signup_password,
        signup_password_confirm,
        signup_secret_key,
      },
    };
    return res.status(401).render("signup", renderOptions);
  }
});

export default router;
