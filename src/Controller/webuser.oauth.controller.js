import bcrypt from "bcrypt";
import { pool } from "../db/connectPostgresdb.js";
import { SecretKey } from "../config/config.js";
import jwt from "jsonwebtoken";

export const googleOauthController = async (req, res, next) => {
  try {
    const { email, username, image } = req.body;
    const password = process.env.GOOGLE_OAUTH_PASSWORD;
    const phoneNumber = 9777777777777;

    if (!email || !username) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    let user;

    if (existingUser.rows.length >= 1) {
      user = existingUser.rows[0];

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password." });
      }

      if (!user.isverifiedmail) {
        await pool.query(
          "UPDATE users SET isverifiedmail = $1 WHERE email = $2",
          [true, email]
        );
        user.isverifiedmail = true;
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `
          INSERT INTO users (username, email, image, password, phoneNumber, isverifiedmail) 
          VALUES ($1, $2, $3, $4, $5, $6) 
          RETURNING *;
        `;
      const values = [
        username,
        email,
        image,
        hashedPassword,
        phoneNumber,
        true,
      ];
      const result = await pool.query(query, values);
      user = result.rows[0];
    }

    console.log(user._id);

    const token = jwt.sign({ id: user._id }, SecretKey, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message:
        existingUser.rows.length >= 1
          ? "User logged in successfully."
          : "User created successfully.",
      data: user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
