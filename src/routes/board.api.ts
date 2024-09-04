import { Router } from "express";
import {
  createBoardController,
  getBoardListController,
} from "../controllers/board.controllers";
import { checkUserAuthentication } from "../middlewares/auth.middleware";
import { boardValidation } from "../validations/board.validation";

const router: Router = Router();

router.get("/list", checkUserAuthentication, getBoardListController);

router.post(
  "/create",
  checkUserAuthentication,
  boardValidation,
  createBoardController
);

export const boardRouter = router;
