import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  name: String,
});

export const UserModel = model("User", userSchema);
