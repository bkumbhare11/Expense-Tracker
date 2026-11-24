import Transaction from "../model/Transaction.js";
import Budget from "../model/Budget.js";
import mongoose from "mongoose";

export const monthlyReports = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const budgets = await Budget.find({
      user: req.user.userId,
    });

    const reports = await Transaction.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: {
            month: "$_id.month",
            year: "$_id.year",
          },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "Income"] }, "$total", 0],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "Expense"] }, "$total", 0],
            },
          },
        },
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1,
        },
      },
    ]);

    const formattedReports = reports.map((report) => {
      const budget = budgets.find(
        (item) =>
          item.month === report._id.month && item.year === report._id.year,
      );

      const monthlyLimit = budget ? budget.monthlyLimit : null;

      const budgetRemaining =
        monthlyLimit !== null ? monthlyLimit - report.totalExpense : null;

      const budgetUsedPercentage =
        monthlyLimit && monthlyLimit > 0
          ? (report.totalExpense / monthlyLimit) * 100
          : null;

      return {
        month: report._id.month,
        year: report._id.year,
        totalIncome: report.totalIncome,
        totalExpense: report.totalExpense,
        netSavings: report.totalIncome - report.totalExpense,
        budget: {
          monthlyLimit,
          budgetUsed: budget ? report.totalExpense : null,
          budgetRemaining,
          budgetUsedPercentage,
        },
      };
    });

    res.status(200).json({
      success: true,
      message: "Reports Fetched Successfully",
      data: formattedReports,
    });
  } catch (error) {
    const serverError = new Error(
      `Error fetching monthly reports: ${error.message}`,
    );
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const monthlyReport = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const { month, year } = req.query;

    const monthNumber = Number(month);

    if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      const error = new Error("Invalid month");
      error.statusCode = 400;
      return next(error);
    }

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 1);

    const reports = await Transaction.aggregate([
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
          total: { $sum: "$amount" },
        },
      },
    ]);

    const incomeData = reports.find((item) => item._id === "Income");

    const expenseData = reports.find((item) => item._id === "Expense");

    const totalIncome = incomeData ? incomeData.total : 0;
    const totalExpense = expenseData ? expenseData.total : 0;

    const netSavings = totalIncome - totalExpense;

    const budget = await Budget.findOne({
      user: userId,
      month: Number(month),
      year: Number(year),
    });

    const monthlyLimit = budget ? budget.monthlyLimit : null;

    const budgetRemaining =
      monthlyLimit !== null ? monthlyLimit - totalExpense : null;

    const budgetUsedPercentage =
      monthlyLimit !== null && monthlyLimit > 0
        ? (totalExpense / monthlyLimit) * 100
        : null;

    res.status(200).json({
      success: true,
      message: "Monthly Report Fetched Successfully",
      data: {
        month: Number(month),
        year: Number(year),
        totalIncome,
        totalExpense,
        netSavings,

        budget: {
          monthlyLimit,
          budgetUsed: budget ? totalExpense : null,
          budgetRemaining,
          budgetUsedPercentage,
        },
      },
    });
  } catch (error) {
    const serverError = new Error(
      `Error fetching monthly report: ${error.message}`,
    );
    serverError.statusCode = 500;
    return next(serverError);
  }
};
