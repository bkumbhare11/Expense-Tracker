import api from "./api";

export const getDashboardSummary = async () => {
  const res = await api.get("/dashboard/summary");
  return res.data;
};

export const getCategoryExpense = async () => {
  const res = await api.get("/dashboard/category-expenses");
  return res.data;
};

export const getRecentTransactions = async () => {
  const res = await api.get("/dashboard/recent-transactions");
  return res.data;
};
