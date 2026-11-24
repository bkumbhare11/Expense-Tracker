import mongoose from "mongoose";
import User from "../model/User.js";
import Transaction from "../model/Transaction.js";
import Budget from "../model/Budget.js";

export const getDashboardSummary = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let currentMonth = date.getMonth();

    let startDate = new Date(year, currentMonth, 1);
    let endDate = new Date(year, currentMonth + 1, 1);

    const summary = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: "$type",
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const incomeData = summary.find((item) => item._id === "Income");

    const expenseData = summary.find((item) => item._id === "Expense");

    const totalIncome = incomeData ? incomeData.total : 0;
    const totalExpense = expenseData ? expenseData.total : 0;
    const balance = totalIncome - totalExpense;

    let budget = await Budget.findOne({ user: userId, month, year });

    const monthlyLimit = budget.monthlyLimit;
    const savingsGoal = budget.savingsGoal;
    const startingSavings = budget.startingSavings;

    const budgetRemaining = monthlyLimit - totalExpense;
    const budgetUsed = totalExpense;
    const budgetProgress =
      monthlyLimit > 0 ? (totalExpense / monthlyLimit) * 100 : 0;

    const currentMonthSavings = totalIncome - totalExpense;
    const totalSavings = startingSavings + currentMonthSavings;
    const remainingAmount = Math.max(savingsGoal - currentMonthSavings, 0);
    const savingsExceeded = Math.max(totalSavings - savingsGoal, 0);

    const savingsProgress =
      savingsGoal > 0 ? (totalSavings / savingsGoal) * 100 : 0;

    res.status(200).json({
      success: true,
      message: "Summary Fetched Successfully",
      data: {
        totalIncome,
        totalExpense,
        balance,

        monthlyLimit,
        budgetRemaining,
        budgetUsed,
        budgetProgress,

        savingsGoal,
        startingSavings,
        currentMonthSavings,
        totalSavings,
        savingsProgress,
        remainingAmount,
        savingsExceeded,
      },
    });
  } catch (error) {
    const serverError = new Error(`Failed to fetch summary : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const expenseByCategory = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let currentMonth = date.getMonth();

    let startDate = new Date(year, currentMonth, 1);
    let endDate = new Date(year, currentMonth + 1, 1);

    let summary = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          date: {
            $gte: startDate,
            $lt: endDate,
          },
          type: "Expense",
        },
      },
      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Expense Summary Fetched Successfully",
      data: summary,
    });
  } catch (error) {
    const serverError = new Error(`Error fetching summary : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const recentTransactions = async (req, res) => {
  try {
    let userId = req.user.userId;

    let recentTransactions = await Transaction.find({ user: userId })
      .sort({ date: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      message: "Recent Transactions Fetched Successfully",
      data: recentTransactions,
    });
  } catch (error) {
    const serverError = new Error(
      `Error fetching transactions : ${error.message}`,
    );
    serverError.statusCode = 500;
    return next(serverError);
  }
};
