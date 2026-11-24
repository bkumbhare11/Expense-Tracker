import api from "./api";

export const getMonthlyReports = async () => {
  let res = await api.get("/reports/monthly-reports");
  return res.data;
};

export const getMonthlyReport = async () => {
  let res = await api.get("/reports/monthly-report");
  return res.data;
};
