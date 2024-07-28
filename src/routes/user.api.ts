import { Router } from "express";

import { getUsersListController } from "../controllers/user.controllers";

const router: Router = Router();

// router.get("/info/:id", getUserInfoController);

router.get("/list", getUsersListController);

export const usersRouter = router;
