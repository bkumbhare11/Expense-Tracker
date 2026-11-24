import { z } from "zod";

export const budgetSchema = z.object({
  monthlyLimit: z.number().optional(),
  savingsGoal: z.number().optional(),
  startingSavings: z.number().optional(),
  fixedExpenses: z
    .array(
      z.object({
        title: z.string().min(1),
        amount: z.number().min(0),
        category: z.string().min(1),
      }),
    )
    .optional(),
});

export const updateBudgetSchema = z.object({
  monthlyLimit: z.number().optional(),
  savingsGoal: z.number().optional(),
  startingSavings: z.number().optional(),
  fixedExpenses: z
    .array(
      z.object({
        title: z.string().min(1),
        amount: z.number().min(0),
        category: z.string().min(1),
      }),
    )
    .optional(),
});

export const fixedExpensesSchema = z.object({
  fixedExpenses: z
    .array(
      z.object({
        title: z.string().min(1),
        amount: z.number().min(0),
        category: z.string().min(1),
      }),
    )
    .optional(),
});

export const updateFixedExpensesSchema = z.object({
  fixedExpenses: z
    .array(
      z.object({
        title: z.string().min(1),
        amount: z.number().min(0),
        category: z.string().min(1),
      }),
    )
    .optional(),
});
