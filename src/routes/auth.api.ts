import {
  loginController,
  registerController,
} from "@controllers/auth.controllers";
import { loginValidation } from "@validations/login.validation";
import { registerValidation } from "@validations/register.validation";
import { Router } from "express";

require("express-async-errors");

const router: Router = Router();

router.post("/login", loginValidation, loginController);

router.post("/register", registerValidation, registerController);

export const authRouter = router;
