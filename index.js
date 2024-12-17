import { config } from "dotenv";
import express, { json } from "express";
import { userRouter } from "./src/Router/webuserRouter.js";
import { connectDB } from "./src/db/connectMongodb.js";
import cors from "cors";
import { cartRouter } from "./src/Router/cartRouter.js";
import { fileRouter } from "./src/Router/fileRouter.js";

config();
connectDB();
const app = express();
const port = process.env.PORT || 1111;

app.use(json());
app.use(cors());
app.use("/", userRouter);
app.use("/cart", cartRouter);
app.use("/file", fileRouter);
app.use(express.static("./public/"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
