import api from "./api";

export const createBudget = async (formData) => {
  const res = await api.post("/budget/create-budget", formData);
  return res.data;
};

export const getBudget = async () => {
  const res = await api.get("/budget/current-budget");
  return res.data;
};

export const getBudgetById = async (id) => {
  const res = await api.get(`/budget/${id}`);
  return res.data;
};

export const setupMonthlyBudget = async () => {
  const res = await api.post("/budget/setupMonthlyBudget");
  return res.data;
};

export const updateBudget = async (id, formData) => {
  const res = await api.patch(`/budget/update-budget/${id}`, formData);
  return res.data;
};
