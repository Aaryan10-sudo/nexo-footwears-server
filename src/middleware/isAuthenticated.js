import jwt from "jsonwebtoken";
import { SecretKey } from "../config/config.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(400)
        .json({ message: "Authorization token is missing or invalid." });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "Token not provided." });
    }
    const decodedData = await jwt.verify(token, SecretKey);
    req._id = decodedData.id;

    next();
  } catch (error) {
    console.error("Error verifying email:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired." });
    }
    res.status(500).json({ message: "Internal server error." });
  }
};
