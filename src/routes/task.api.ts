import { getTasksController } from "controllers/task.controllers";
import { Router } from "express";

const router = Router();

router.get("/list", getTasksController);

export const taskRouter = router;
