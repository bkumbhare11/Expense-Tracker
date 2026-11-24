import { z } from "zod";

export const transactionSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  category: z.string().min(1),
  type: z.enum(["Income", "Expense"]),
  amount: z.number().positive(),
  date: z.coerce.date(),
});

export const updateTransactionSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  type: z.enum(["Income", "Expense"]).optional(),
  amount: z.number().positive().optional(),
  date: z.coerce.date().optional(),
});
