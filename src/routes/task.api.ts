import {
  createTasksController,
  deleteTasksController,
  getTasksController,
  updateTasksController,
} from "@controllers/task.controllers";
import { checkUserAuthentication } from "@middlewares/auth.middleware";
import { taskValidation } from "@validations/task.validation";
require("express-async-errors");

import { Router } from "express";

const router = Router();

router.get("/list", checkUserAuthentication, getTasksController);

router.post(
  "/create/:id",
  checkUserAuthentication,
  taskValidation,
  createTasksController
);

router.put("/update/:id", checkUserAuthentication, updateTasksController);

router.delete("/delete/:id", checkUserAuthentication, deleteTasksController);

export const taskRouter = router;
