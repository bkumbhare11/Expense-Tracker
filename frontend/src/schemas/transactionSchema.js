import { z } from "zod";

export const transactionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  category: z.string().min(1, "Please select a category"),
  type: z.enum(["Income", "Expense"], { message: "Please select a type" }),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  date: z.coerce.date("Date is required"),
});

export const updateTransactionSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  category: z.string().min(1).optional(),
  type: z.enum(["Income", "Expense"]).optional(),
  amount: z.coerce.number().positive().optional(),
  date: z.coerce.date().optional(),
});
