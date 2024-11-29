import { Router } from "express";
import {
  deleteTasksController,
  getTasksController,
  updateTasksController,
} from "../controllers/task.controllers";
import { checkUserAuthentication } from "../middlewares/auth.middleware";

const router = Router();

router.get("/list", checkUserAuthentication, getTasksController);
router.put("/update/:id", checkUserAuthentication, updateTasksController);
router.delete("/delete/:id", checkUserAuthentication, deleteTasksController);

export const taskRouter = router;
