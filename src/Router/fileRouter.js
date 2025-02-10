import { Router } from "express";

import {
  handleMultipleFileController,
  handleSingleFileController,
} from "../Controller/file.controller.js";
import { upload } from "../utils/sendFile.js";

export const fileRouter = Router();
fileRouter
  .route("/single")
  .post(upload.single("document"), handleSingleFileController);
fileRouter
  .route("/multiple")
  .post(upload.array("document"), handleMultipleFileController);
