import api from "./api";

export const addTransaction = async (formData) => {
  const res = await api.post("/transactions/create-transaction", formData);
  return res.data;
};

export const getTransactions = async (filters) => {
  const res = await api.get("/transactions/all-transactions", {
    params: filters,
  });
  return res.data;
};

export const updateTransaction = async (id, formData) => {
  const res = await api.patch(
    `/transactions/update-transaction/${id}`,
    formData,
  );
  return res.data;
};

export const deleteTransaction = async (id) => {
  let res = await api.delete(`/transactions/delete-transaction/${id}`);
  return res.data;
};
