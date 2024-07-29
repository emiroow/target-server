import { Router } from "express";
import {
  loginController,
  registerController,
} from "../../src/controllers/auth.controllers";
import { loginValidation } from "../../src/validations/login.validation";
import { registerValidation } from "../../src/validations/register.validation";
require("express-async-errors");

const router: Router = Router();

router.post("/login", loginValidation, loginController);

router.post("/register", registerValidation, registerController);

export const authRouter = router;
