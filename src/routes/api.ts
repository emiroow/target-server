import { Router } from "express";
import { usersRouter } from "./user.api";

const router: Router = Router();

router.use("/users", usersRouter);

export const apiRouter = router;
