import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import {
  fixedExpensesSchema,
  updateFixedExpensesSchema,
} from "../validator/budgetValidator.js";
import {
  addExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/fixedExpensesController.js";

const router = express.Router();

router.post(
  "/add-expense",
  authMiddleware,
  validateMiddleware(fixedExpensesSchema),
  addExpense,
);

router.patch(
  "/update-expense/:id",
  authMiddleware,
  validateMiddleware(updateFixedExpensesSchema),
  updateExpense,
);

router.delete("/delete-expense/:id", authMiddleware, deleteExpense);

export default router;
