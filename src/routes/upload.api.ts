import { Router } from "express";
import {
  createUploadController,
  getUploadListController,
} from "../controllers/upload.controllers";
import { checkUserAuthentication } from "../middlewares/auth.middleware";
import { uploadMiddleWare } from "../middlewares/upload.middleware";

const router: Router = Router();

router.post(
  "/create",
  checkUserAuthentication,
  uploadMiddleWare.single("image"),
  createUploadController
);

router.get("/list", checkUserAuthentication, getUploadListController);

export const uploadRouter = router;
