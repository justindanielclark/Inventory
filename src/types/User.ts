import { Document, Types } from "mongoose";
import Role from "./Roles";

interface User {
  role: Role;
  username: string;
  email: string;
  signupDate: Date;
  password: string;
}

interface UserJSON {
  role: string;
  username: string;
  email: string;
  signupDate: string;
  password: string;
}

export default User;
export { User, UserJSON };
