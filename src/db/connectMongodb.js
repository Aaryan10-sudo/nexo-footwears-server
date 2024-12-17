import mongoose from "mongoose";
import { DatabaseURL } from "../config/config.js";

export const connectDB = () => {
  mongoose.connect(DatabaseURL);
  console.log("Connected to database");
};
