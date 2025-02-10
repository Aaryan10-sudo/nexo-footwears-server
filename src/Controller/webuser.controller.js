import bcrypt from "bcrypt";
import { User } from "../schema/webuserSchema.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";
import { SecretKey } from "../config/config.js";
import { pool } from "../db/connectPostgresdb.js";

export const createWebuserController = async (req, res) => {
  try {
    const { email, password, username, phoneNumber } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length >= 1) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(12)
    );

    const query = `
      INSERT INTO users (username, email, phoneNumber, password) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `;

    const values = [username, email, phoneNumber, hashedPassword];

    const result = await pool.query(query, values);

    const token = jwt.sign({ id: result.rows[0]._id }, SecretKey, {
      expiresIn: "1d",
    });

    const baseUrl = process.env.BASE_URL || "https://nexo-footwears.vercel.app";
    const verificationLink = `${baseUrl}/verify?token=${token}`;

    try {
      await sendMail({
        to: email,
        subject: "Email Verification",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
            <h1 style="color: #333;">Hello ${username},</h1>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              Thanks for registering your account with <strong>Nexo Footwears</strong>.
            </p>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              Please click on the button below to verify your email:
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${verificationLink}" 
                style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
                Verify Email
              </a>
            </div>
            <p style="font-size: 14px; line-height: 1.5; color: #888;">
              If the button doesn't work, copy and paste the following link into your browser:
            </p>
            <p style="font-size: 14px; color: #007BFF; word-wrap: break-word;">
              ${verificationLink}
            </p>
            <p style="font-size: 14px; line-height: 1.5; color: #888; margin-top: 30px;">
              Best regards,<br/>
              Nexo Footwears
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      return res
        .status(500)
        .json({ message: "Failed to send verification email." });
    }

    res.status(201).json({
      message: `Verification mail sent to ${email}. Please verify your account.`,
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyWebuserController = async (req, res, next) => {
  try {
    let id = req._id;
    const updatedUser = await pool.query(
      "UPDATE users SET isVerifiedMail = true WHERE _id = $1 RETURNING *",
      [id]
    );
    if (updatedUser < 1) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      data: updatedUser.rows,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginWebuserController = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.length < 1) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    if (user.isVerifiedMail === false) {
      return res.status(400).json({ message: "Email has not verified yet" });
    }
    const isVerifiedPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (!isVerifiedPassword) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign({ id: user.rows[0]._id }, SecretKey, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Log in successfull",
      token: token,
      data: user.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSpecificWebuser = async (req, res, next) => {
  try {
    let id = req._id;
    const user = await pool.query("SELECT * FROM users WHERE _id = $1", [id]);
    if (user.length < 1) {
      return res.status(404).json({ message: "User not found." });
    }
    res
      .status(200)
      .json({ message: "User found successfully.", data: user.rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
