import User from "../model/User.js";
import Budget from "../model/Budget.js";
import Transaction from "../model/Transaction.js";
import mongoose from "mongoose";
import { success } from "zod";

export const createBudget = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const isBudgetExists = await Budget.findOne({ user: userId, month, year });

    if (isBudgetExists) {
      const error = new Error("Budget already exists");
      error.statusCode = 409;
      return next(error);
    }

    const { monthlyLimit, savingsGoal, startingSavings, fixedExpenses } =
      req.body;

    let budget = await Budget.create({
      user: userId,
      month,
      year,
      monthlyLimit,
      savingsGoal,
      startingSavings,
      fixedExpenses,
    });

    res.status(201).json({
      success: true,
      message: "Budget Created Successfully",
      data: budget,
    });
  } catch (error) {
    const serverError = new Error(`Error creating budget : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const setupMonthlyBudget = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const isBudgetExists = await Budget.findOne({ user: userId, month, year });

    if (isBudgetExists) {
      return res.status(200).json({
        success: true,
        message: "Budget Already Exists",
        data: isBudgetExists,
      });
    }

    let previoustMonth = month === 1 ? 12 : month - 1;
    let previousYear = month === 1 ? year - 1 : year;

    let startDate = new Date(previousYear, previoustMonth - 1, 1);
    let endDate = new Date(year, month - 1, 1);

    const previousMonthBudget = await Budget.findOne({
      user: userId,
      month: previoustMonth,
      year: previousYear,
    });

    let budget;

    if (previousMonthBudget) {
      const previousMonthSummary = await Transaction.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
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

      const incomeData = previousMonthSummary.find(
        (item) => item._id === "Income",
      );

      const expenseData = previousMonthSummary.find(
        (item) => item._id === "Expense",
      );

      const totalIncome = incomeData ? incomeData.total : 0;
      const totalExpense = expenseData ? expenseData.total : 0;

      let endingSavings =
        previousMonthBudget.startingSavings + totalIncome - totalExpense;

      budget = await Budget.create({
        user: userId,
        month,
        year,
        monthlyLimit: previousMonthBudget.monthlyLimit,
        savingsGoal: previousMonthBudget.savingsGoal,
        fixedExpenses: [...previousMonthBudget.fixedExpenses],
        startingSavings: endingSavings,
      });

      return res.status(201).json({
        success: true,
        message: "Monthly budget setup successfully",
        data: budget,
        lastMonth: previousMonthBudget,
        lastSummary: previousMonthSummary,
      });
    } else {
      return res.status(200).json({
        success: true,
        setupRequired: true,
        message: "Please create your monthly budget",
        data: null,
      });
    }
  } catch (error) {
    const serverError = new Error(`Error setting up budget : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const getbudget = async (req, res, next) => {
  try {
    let userId = req.user.userId;

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let budget = await Budget.findOne({ user: userId, month, year });

    if (!budget) {
      const error = new Error("Budget Not Found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Budget Fetched Successfully",
      data: budget,
    });
  } catch (error) {
    const serverError = new Error(`Error fetching budget : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const getBudgetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const budget = await Budget.findOne({ user: userId, _id: id });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Budget fetched successfully",
      data: budget,
    });
  } catch (error) {
    const serverError = new Error(`Error fetching budget : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const budget = await Budget.findOneAndUpdate(
      { user: userId, _id: id },
      req.body,
      { returnDocument: "after" },
    );

    if (!budget) {
      const error = new Error("Budget Not Found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Budget Updated Successfully",
      data: budget,
    });
  } catch (error) {
    const serverError = new Error(`Error updating budget : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const getBudgetHistory = async (req, res) => {
  try {
    let userId = req.user.userId;

    let history = await Budget.find({ user: userId }).sort({
      year: -1,
      month: -1,
    });

    if (history.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Budget History Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "History Fetched Successfully",
      data: history,
    });
  } catch (error) {
    const serverError = new Error(
      `Failed to fetch budget history : ${error.message}`,
    );
    serverError.statusCode = 500;
    return next(serverError);
  }
};
