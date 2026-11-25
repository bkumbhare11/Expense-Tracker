import BalanceCard from "../components/dashboard/BalanceCard";
import SpendingOverviewCard from "../components/dashboard/SpendingOverviewCard";
import SavingOverviewCard from "../components/dashboard/SavingOverviewCard";
import MonthlyBudgetCard from "../components/dashboard/MonthlyBudgetCard";
import MonthlySavingsCard from "../components/dashboard/MonthlySavingsCard";
import PageHeader from "../components/PageHeader";
import SpendingChart from "../components/dashboard/SpendingChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import Empty from "./Empty";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { useEffect } from "react";
import {
  getDashboardSummary,
  getCategoryExpense,
  getRecentTransactions,
} from "@/services/dashboardService";
import { getBudget } from "@/services/budgetService";
import { WalletMoney } from "reicon-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [hasbudget, setHasbudget] = useState(false);
  const [summary, setSummary] = useState("");
  const [categoryExpense, setCategoryExpense] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await getDashboardSummary();
        setSummary(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error Fetching Summary");
      }
    }

    async function fetchCategoryExpenses() {
      try {
        const res = await getCategoryExpense();
        setCategoryExpense(res.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error Fetching Category Expense",
        );
      }
    }

    async function fetchRecentTransactions() {
      try {
        const res = await getRecentTransactions();
        setTransactions(res.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error Fetching Recent Transaction",
        );
      }
    }

    async function fetchBudget() {
      try {
        const res = await getBudget();

        if (res.success) {
          fetchDashboard();
          fetchCategoryExpenses();
          setHasbudget(true);
        }
      } catch (error) {
        if (error.response.status === 404) {
          setHasbudget(false);
        } else {
          toast.error(error.response?.data?.message || "Error Fetching Budget");
        }
      }
    }
    fetchBudget();

    fetchRecentTransactions();
  }, []);

  return (
    <div>
      <PageHeader
        title={"Dashboard"}
        subtitle={"Here's your financial overview"}
      />
      {hasbudget ? (
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <div className="flex-1 space-y-4">
            <div className="flex flex-col gap-3 md:gap-6 md:flex-row">
              <BalanceCard user={user} summary={summary} />
              <SpendingOverviewCard summary={summary} />
              <SavingOverviewCard summary={summary} />
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:gap-4">
              <MonthlyBudgetCard summary={summary} />
              <MonthlySavingsCard summary={summary} />
            </div>
          </div>
          <SpendingChart categoryExpense={categoryExpense} />
        </div>
      ) : (
        <Empty
          icon={<WalletMoney size={48} />}
          title="No Budget Set Up Yet"
          description="Create your monthly budget to start tracking your expenses and savings."
          button="Set Up Budget"
          onClick={() => navigate("/budget-form")}
        />
      )}

      <RecentTransactions transactions={transactions} />
    </div>
  );
}

export default Dashboard;
