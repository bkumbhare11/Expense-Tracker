import Budget from "../model/Budget.js";

export const addExpense = async (req, res) => {
  try {
    const userId = req.user.userId;

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const budget = await Budget.findOne({ user: userId, month, year });

    if (!budget) {
      const error = new Error("Budget Not Found");
      error.statusCode = 404;
      return next(error);
    }

    const { title, amount, category } = req.body;

    let isExists = budget.fixedExpenses.find(
      (expense) =>
        expense.title.toLowerCase() === title.toLowerCase() &&
        expense.category.toLowerCase() === category.toLowerCase(),
    );

    if (isExists) {
      const error = new Error("Fixed expense already exists");
      error.statusCode = 409;
      return next(error);
    }

    budget.fixedExpenses.push({ title, amount, category });
    await budget.save();

    res.status(200).json({
      success: true,
      message: "Expense Added Successfully",
      data: budget,
    });
  } catch (error) {
    const serverError = new Error(`Failed to add expense : ${error.message}`);
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const updateExpense = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const budget = await Budget.findOne({ user: userId, month, year });

    if (!budget) {
      const error = new Error("Budget Not Found");
      error.statusCode = 404;
      return next(error);
    }

    const { title, amount, category } = req.body;

    let fixedExpense = budget.fixedExpenses.find(
      (expense) => expense._id.toString() === id,
    );

    if (!fixedExpense) {
      const error = new Error("Fixed Expense Not Found");
      error.statusCode = 404;
      return next(error);
    }

    if (title !== undefined) {
      fixedExpense.title = title;
    }

    if (amount !== undefined) {
      fixedExpense.amount = amount;
    }

    if (category !== undefined) {
      fixedExpense.category = category;
    }

    await budget.save();

    res.status(200).json({
      success: true,
      message: "Fixed Expense Updated Successfully",
      data: budget,
    });
  } catch (error) {
    const serverError = new Error(
      `Error updating fixed expense : ${error.message}`,
    );
    serverError.statusCode = 500;
    return next(serverError);
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const budget = await Budget.findOne({ user: userId, month, year });

    let fixedExpense = budget.fixedExpenses.find(
      (expense) => expense._id.toString() === id,
    );

    if (!fixedExpense) {
      const error = new Error("Fixed Expense Not Found");
      error.statusCode = 404;
      return next(error);
    }

    budget.fixedExpenses = budget.fixedExpenses.filter(
      (expense) => expense._id.toString() !== id,
    );

    await budget.save();

    res.status(200).json({
      success: true,
      message: "Fixed Expense Deleted Successfully",
      data: budget,
    });
  } catch (error) {
    const serverError = new Error(
      `Failed to delete fixed expense : ${error.message}`,
    );
    serverError.statusCode = 500;
    return next(serverError);
  }
};
