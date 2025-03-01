import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createWebuserController,
  getSpecificWebuser,
  loginWebuserController,
  verifyWebuserController,
} from "../Controller/webuser.controller.js";

export const userRouter = Router();
userRouter.route("/register").post(createWebuserController);
userRouter.route("/verify").post(isAuthenticated, verifyWebuserController);
userRouter.route("/user").get(isAuthenticated, getSpecificWebuser);
userRouter.route("/log-in").post(loginWebuserController);
