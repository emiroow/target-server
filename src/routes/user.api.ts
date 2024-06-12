import { Router } from "express";
import {
  createUserController,
  getUserInfoController,
  getUsersListController,
} from "../controllers/user.controllers";

const router: Router = Router();

router.get("/info/:id", getUserInfoController);

router.get("/list", getUsersListController);

router.post("/create", createUserController);

export const usersRouter = router;
