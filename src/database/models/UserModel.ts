import User from "../../types/User";
import mongoose, { Schema } from "mongoose";

const UserModel = mongoose.model(
  "User",
  new Schema<User>(
    {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      signupDate: {
        type: Date,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    {
      collection: "Users",
      versionKey: false,
    }
  )
);

export default UserModel;
