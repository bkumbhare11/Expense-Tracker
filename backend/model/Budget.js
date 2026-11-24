import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  year: {
    type: Number,
    required: true,
  },
  monthlyLimit: {
    type: Number,
    min: 0,
  },
  savingsGoal: {
    type: Number,
    min: 0,
  },
  startingSavings: {
    type: Number,
  },
  fixedExpenses: [
    {
      title: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      category: {
        type: String,
        required: true,
      },
    },
  ],
});

budgetSchema.index({ user: 1, month: 1, year: 1 }, { unique: true });

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
