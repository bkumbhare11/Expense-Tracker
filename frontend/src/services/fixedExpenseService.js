import api from "./api";

export const addExpense = async (formData) => {
  const res = api.post("/budget/fixed-expenses/add-expense", formData);
  return res.data;
};

export const updateExpense = async (formData, id) => {
  const res = await api.patch(
    `/budget/fixed-expenses/update-expense/${id}`,
    formData,
  );
  return res.data;
};

export const deleteExpense = async (id) => {
  const res = await api.delete(`/budget/fixed-expenses/${id}`);
  return res.data;
};
