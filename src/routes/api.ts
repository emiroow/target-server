import { Router } from "express";
import { authRouter } from "./auth.api";
import { boardRouter } from "./board.api";
import { uploadRouter } from "./upload.api";
import { usersRouter } from "./user.api";

const router: Router = Router();

router.use("/user", usersRouter);
router.use("/board", boardRouter);
router.use("/auth", authRouter);
router.use("/upload", uploadRouter);

export const apiRouter = router;
