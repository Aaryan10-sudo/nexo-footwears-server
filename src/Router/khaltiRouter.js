import { Router } from "express";
import {
  completeKhaltiPaymentController,
  initializeKhaltiPaymentController,
} from "../Controller/khaltiController.js";

export const khaltiRouter = Router();

khaltiRouter.post("/initialize-khalti", initializeKhaltiPaymentController);
khaltiRouter.get("/complete-khalti-payment", completeKhaltiPaymentController);
