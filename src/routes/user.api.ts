import { Router } from "express";
import { checkUserAuthentication } from "../../src/middlewares/auth.middleware";
import {
  getUserInfoController,
  getUsersListController,
} from "../controllers/user.controllers";
require("express-async-errors");

const router: Router = Router();

router.get("/list", checkUserAuthentication, getUsersListController);

router.get("/info", checkUserAuthentication, getUserInfoController);

export const usersRouter = router;
