import express from "express";
import authMiddlware from "../middlewares/authMiddleware.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
} from "../controllers/transactionController.js";
import {
  transactionSchema,
  updateTransactionSchema,
} from "../validator/transactionValidator.js";

const router = express.Router();

router.post(
  "/create-transaction",
  authMiddlware,
  validateMiddleware(transactionSchema),
  createTransaction,
);

router.get("/all-transactions", authMiddlware, getTransactions);

router.get("/summary", authMiddlware, getSummary);

router.get("/:id", authMiddlware, getTransaction);

router.patch(
  "/update-transaction/:id",
  authMiddlware,
  validateMiddleware(updateTransactionSchema),
  updateTransaction,
);

router.delete("/delete-transaction/:id", authMiddlware, deleteTransaction);

export default router;
