import { Router } from "express";
import { authRouter } from "./auth.api";
import { boardRouter } from "./board.api";
import { targetRouter } from "./target.api";
import { taskRouter } from "./task.api";
import { uploadRouter } from "./upload.api";
import { usersRouter } from "./user.api";

const router: Router = Router();

router.use("/user", usersRouter);
router.use("/task", taskRouter);
router.use("/board", boardRouter);
router.use("/auth", authRouter);
router.use("/upload", uploadRouter);
router.use("/target", targetRouter);

export const apiRouter = router;
