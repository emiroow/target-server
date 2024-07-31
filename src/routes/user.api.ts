import { Router } from "express";
import { checkUserAuthentication } from "../../src/middlewares/auth.middleware";
import { getUsersListController } from "../controllers/user.controllers";
require("express-async-errors");

const router: Router = Router();

// router.get("/info/:id", getUserInfoController);

router.get("/list", checkUserAuthentication, getUsersListController);

export const usersRouter = router;
