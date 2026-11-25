import express from "express";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  loginSchema,
  registerSchema,
  changePasswordSchema,
  resetPasswordSchema,
} from "../validator/authValidator.js";

import {
  loginUser,
  logoutUser,
  registerUser,
  changePassword,
  forgotPassword,
  resetPassword,
  profile,
  deleteAccount,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", validateMiddleware(registerSchema), registerUser);

router.post("/login", validateMiddleware(loginSchema), loginUser);

router.get("/profile", authMiddleware, profile);

router.post(
  "/change-password",
  authMiddleware,
  validateMiddleware(changePasswordSchema),
  changePassword,
);

router.post(
  "/reset-password",
  authMiddleware,
  validateMiddleware(resetPasswordSchema),
  resetPassword,
);

router.post("/forgot-password", forgotPassword);

router.post("/logout", logoutUser);

router.delete("/delete-account", authMiddleware, deleteAccount);

export default router;
