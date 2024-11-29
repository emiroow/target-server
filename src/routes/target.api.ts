import { Router } from "express";
import {
  createTargetController,
  deleteTargetController,
  getTargetInfoController,
  getTargetList,
  updateTargetController,
} from "../controllers/target.controllers";
import { checkUserAuthentication } from "../middlewares/auth.middleware";
import { targetValidation } from "../validations/target.validation";

const router = Router();

router.post(
  "/create",
  checkUserAuthentication,
  targetValidation,
  createTargetController
);

router.get("/list", checkUserAuthentication, getTargetList);

router.get("/info/:id", checkUserAuthentication, getTargetInfoController);

router.put("/update/:id", checkUserAuthentication, updateTargetController);

router.delete("/delete/:id", checkUserAuthentication, deleteTargetController);

export const targetRouter = router;
