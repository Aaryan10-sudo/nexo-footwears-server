import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import { cartRouter } from "./src/Router/cartRouter.js";
import { fileRouter } from "./src/Router/fileRouter.js";
import { khaltiRouter } from "./src/Router/khaltiRouter.js";
import { orderRouter } from "./src/Router/orderRouter.js";
import { productRouter } from "./src/Router/productRouter.js";
import { userRouter } from "./src/Router/webuserRouter.js";
import { connectMongo } from "./src/db/connectMongodb.js";
import { connectPostgres } from "./src/db/connectPostgresdb.js";

config();
connectMongo();
connectPostgres();
const app = express();
const port = process.env.PORT || 1111;

app.use(json());
app.use(cors());
app.use("/", userRouter);
app.use("/cart", cartRouter);
app.use("/file", fileRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/", khaltiRouter);
app.use(express.static("./public/"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
