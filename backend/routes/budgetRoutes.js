import express from "express";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  budgetSchema,
  updateBudgetSchema,
} from "../validator/budgetValidator.js";
import {
  createBudget,
  getbudget,
  getBudgetById,
  updateBudget,
  getBudgetHistory,
  setupMonthlyBudget,
} from "../controllers/budgetController.js";

const router = express.Router();

router.post(
  "/create-budget",
  authMiddleware,
  validateMiddleware(budgetSchema),
  createBudget,
);

router.post("/setupMonthlyBudget", authMiddleware, setupMonthlyBudget);

router.get("/current-budget", authMiddleware, getbudget);

router.get("/:id", authMiddleware, getBudgetById);

router.get("/history", authMiddleware, getBudgetHistory);

router.patch(
  "/update-budget/:id",
  authMiddleware,
  validateMiddleware(updateBudgetSchema),
  updateBudget,
);

export default router;
