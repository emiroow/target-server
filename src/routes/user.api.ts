import { Router } from "express";
import { getUsersListController } from "../controllers/user.controllers";
require("express-async-errors");

const router: Router = Router();

// router.get("/info/:id", getUserInfoController);

router.get("/list", getUsersListController);

export const usersRouter = router;
