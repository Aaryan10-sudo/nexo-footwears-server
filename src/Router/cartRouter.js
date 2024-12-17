import { Router } from "express";
import {
  addCartController,
  deleteCart,
  getSpecificUserCart,
} from "../Controller/cartController.js";

export const cartRouter = Router();
cartRouter.route("/add").post(addCartController);
cartRouter.route("/get").get(getSpecificUserCart);
cartRouter.route("/delete").delete(deleteCart);