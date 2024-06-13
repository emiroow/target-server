import { Router } from "express";

import { validate } from "src/middlewares/validate.middleware ";
import { userSchema } from "src/validations/user.schema";
import {
  createUserController,
  getUserInfoController,
  getUsersListController,
} from "../controllers/user.controllers";

const router: Router = Router();

router.get("/info/:id", getUserInfoController);

router.get("/list", getUsersListController);

router.post("/create", validate(userSchema), createUserController);

export const usersRouter = router;
