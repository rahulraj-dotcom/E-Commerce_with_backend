import { Router } from "express";
import {
  registerValidator,
  loginValidator,
} from "../validator/auth.validator.js";
import {
  registerController,
  loginController,
  refreshController,
  getMeController,
  logoutController,
} from "../controller/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// register api
// /api/auth/register
router.post("/register", registerValidator, registerController);

// login api
// /api/auth/login
router.post("/login", loginValidator, loginController);

// refresh
// /api/auth/refresh
router.post("/refresh", refreshController);

// me
// /api/auth/me
router.get("/me", authenticate, getMeController);

// logOut
// /api/auth/logout
router.post("/logout", logoutController);

export default router;
