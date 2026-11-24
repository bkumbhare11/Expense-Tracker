import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getDashboardSummary,
  expenseByCategory,
  recentTransactions,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/summary", authMiddleware, getDashboardSummary);

router.get("/category-expenses", authMiddleware, expenseByCategory);

router.get("/recent-transactions", authMiddleware, recentTransactions);

export default router;
