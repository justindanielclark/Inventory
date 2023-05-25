import Role from "./Roles";

interface User {
  role: Role;
  username: string;
  email: string;
  signupDate: Date;
}

interface UserJSON {
  role: string;
  username: string;
  email: string;
  signupDate: string;
}

export default User;
export { User, UserJSON };
