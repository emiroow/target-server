import {
  getUserInfoController,
  getUsersListController,
} from "@controllers/user.controllers";
import { checkUserAuthentication } from "@middlewares/auth.middleware";
import { Router } from "express";
require("express-async-errors");

const router: Router = Router();

router.get("/list", checkUserAuthentication, getUsersListController);

router.get("/info", checkUserAuthentication, getUserInfoController);

export const usersRouter = router;
