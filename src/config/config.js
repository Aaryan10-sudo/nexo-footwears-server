import { config } from "dotenv";

config();
export const DatabaseURL = process.env.DATABASE_URL;
export const Email = process.env.SEND_MAIL_USER;
export const Password = process.env.SEND_MAIL_PASSWORD;
export const SecretKey = process.env.SECRET_KEY;
