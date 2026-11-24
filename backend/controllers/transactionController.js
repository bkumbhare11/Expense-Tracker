import mongoose from "mongoose";
import Transaction from "../model/Transaction.js";
import User from "../model/User.js";

export const createTransaction = async (req, res) => {
  try {
    const { title, description, category, amount, type, date } = req.body;

    const userId = req.user.userId;

    let transation = await Transaction.create({
      user: userId,
      title,
      description,
      category,
      amount,
      type,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Transaction Created Successfully",
      data: transation,
    });
  } catch (error) {
    const serverError = new Error(
      `Failed to create transaction : ${error.message}`,
    );
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const getTransactions = async (req, res, next) => {
  try {
    let userId = req.user.userId;

    let {
      search,
      type,
      category,
      startDate,
      endDate,
      sort = "latest",
      page = 1,
      limit = 10,
    } = req.query;

    let query = {
      user: userId,
    };

    let sortOption = {};

    let skip = (page - 1) * limit;

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (type) {
      query.type = type;
    }

    if (category) {
      query.category = category;
    }

    if (startDate) {
      query.date = { $gte: startDate };
    }

    if (endDate) {
      query.date = { $lte: endDate };
    }

    if (sort === "latest") {
      sortOption.createdAt = -1;
    }
    if (sort === "oldest") {
      sortOption.createdAt = 1;
    }
    if (sort === "amountLow") {
      sortOption.amount = 1;
    }
    if (sort === "amountHigh") {
      sortOption.amount = -1;
    }

    let transactions = await Transaction.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    if (transactions.length === 0) {
      const error = new Error("No Transactions Found");
      error.statusCode = 404;
      return next(error);
    }

    let total = await Transaction.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Fetched Transactions Successfully",
      data: transactions,
      pagination: {
        currentPage: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    const serverError = new Error(
      `Error fetching transactions : ${error.message}`,
    );
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    let transaction = await Transaction.findOne({ user: userId, _id: id });

    if (!transaction) {
      const error = new Error("No Transaction Found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Fetched Transaction Successfully",
      data: transaction,
    });
  } catch (error) {
    const serverError = new Error(
      `Error fetching transaction : ${error.message}`,
    );
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    let transaction = await Transaction.findOneAndUpdate(
      { user: userId, _id: id },
      req.body,
      { returnDocument: "after" },
    );

    if (!transaction) {
      const error = new Error("No Transaction Found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Transaction Updated Successfully",
      data: transaction,
    });
  } catch (error) {
    const serverError = new Error(
      `Error updating transaction : ${error.message}`,
    );
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const transaction = await Transaction.findOneAndDelete({
      user: userId,
      _id: id,
    });

    if (!transaction) {
      const error = new Error("No Transaction Found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Transaction Deleted Successfully",
      data: transaction,
    });
  } catch (error) {
    const serverError = new Error(
      `Error deleting transaction : ${error.message}`,
    );
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const getSummary = async (req, res) => {
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

    let Balance = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      message: "Summary Fetched Successfully",
      data: summary,
    });
  } catch (error) {
    const serverError = new Error(`Error fetching summary : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};
