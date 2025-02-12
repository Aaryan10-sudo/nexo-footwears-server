import { Router } from "express";
import { googleOauthController } from "../Controller/webuser.oauth.controller.js";

export const googleOauthRouter = Router();
googleOauthRouter.route("/log-in").post(googleOauthController);
