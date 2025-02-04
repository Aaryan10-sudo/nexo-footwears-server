import mongoose from "mongoose";
import { DatabaseURL } from "../config/config.js";

export const connectMongo = () => {
  mongoose.connect(DatabaseURL);
  console.log("MongoDB connected Successfully!");
};
