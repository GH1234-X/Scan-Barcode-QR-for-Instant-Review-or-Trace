import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // install with: npm install uuid

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      default: uuidv4,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
