import { Router } from "express";
import {
  createWebuserController,
  getSpecificWebuser,
  loginWebuserController,
  verifyWebuserController,
} from "../Controller/webUserController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

export const userRouter = Router();
userRouter.route("/register").post(createWebuserController);
userRouter.route("/verify").post(isAuthenticated, verifyWebuserController);
userRouter.route("/user").get(isAuthenticated, getSpecificWebuser);
userRouter.route("/log-in").post(loginWebuserController);
