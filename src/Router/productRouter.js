import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../Controller/productController.js";

export const productRouter = Router();
productRouter.post("/add", createProduct);
productRouter.get("/get", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.patch("/:id", updateProductById);
productRouter.delete("/:id", deleteProductById);
