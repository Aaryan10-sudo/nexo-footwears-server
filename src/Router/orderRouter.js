import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSpecificOrder,
  updateOrder,
} from "../Controller/order.controller.js";

export const orderRouter = Router();

orderRouter.post("/create-order", createOrder);
orderRouter.get("/get-order", getAllOrders);
orderRouter.get("/get-order/:id", getSpecificOrder);
orderRouter.patch("/update-order/:id", updateOrder);
orderRouter.delete("/delete-order/:id", deleteOrder);
