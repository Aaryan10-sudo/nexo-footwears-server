import nodemailer from "nodemailer";
import { Email, Password } from "../config/config.js";

const transporterInfo = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: Email,
    pass: Password,
  },
};

export const sendMail = async (mailInfo) => {
  try {
    const transporter = nodemailer.createTransport(transporterInfo);
    const info = await transporter.sendMail(mailInfo);
  } catch (error) {
    console.log("Error Detected", error.message);
  }
};
