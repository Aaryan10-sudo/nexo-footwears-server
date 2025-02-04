import { config } from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

config();
const isProduction = process.env.NODE_ENV === "production";

export const pool = new Pool({
  connectionString: process.env.POSTGRES_DATABASE_URL,
  ssl: false,
});

export const connectPostgres = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW();");
    console.log("Postgres Database Connected Successfully!");
    client.release();
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
};
