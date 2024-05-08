import mongoose from "mongoose";
import { USER, ADMIN } from "../utils/roles.js";

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, `Username is required`],
    validate: {
      validator: (value) => /\w{3,}/.test(value),
      message: (props) => `Username should be at least 3 characters`,
    },
  },
  email: {
    type: String,
    unique: true,
    require: [true, `Email is required`],
    validate: {
      validator: (value) => /^[a-z A-Z]\w+@\w+\.\w+/.test(value),
      message: (props) => `${props.value} | is not a valid email `,
    },
  },
  password: {
    type: String,
    required: [true, `Password is required`],
    validate: {
      validator: (value) => /\w{8,}/.test(value),
      message: (props) => `${props.value}| is less then 8 characters`,
    },
  },
  role: {
    type: String,
    enum: [USER, ADMIN],
    default: USER,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  cart: [String],
  token: String,
});

const Users = mongoose.model("users", usersSchema);

export default Users;
