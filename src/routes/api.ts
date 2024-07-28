import { Router } from "express";
import { authRouter } from "./auth.api";
import { usersRouter } from "./user.api";

const router: Router = Router();

router.use("/users", usersRouter);
router.use("/auth", authRouter);

export const apiRouter = router;
