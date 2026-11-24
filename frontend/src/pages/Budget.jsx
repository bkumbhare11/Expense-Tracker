import PageHeader from "@/components/PageHeader";
import { useEffect, useState } from "react";
import { Edit } from "reicon-react";
import { Calendar } from "reicon-react";
import { setupMonthlyBudget } from "@/services/budgetService";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import Empty from "./Empty";
import { WalletMoney } from "reicon-react";

function Budget() {
  const navigate = useNavigate();
  const [budgetData, setBudgetData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    async function fetchBudget() {
      try {
        setIsLoading(true);
        let res = await setupMonthlyBudget();
        setBudgetData(res.data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error Fetching Budget");
      }
    }
    fetchBudget();
  }, []);

  const monthName = budgetData?.month ? months[budgetData.month - 1] : "";
  return (
    <>
      <PageHeader title="Budget" subtitle="Manage Your Monthly Budget" />

      {isLoading ? (
        <Loader />
      ) : budgetData ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="bg-[#F5F5F5] rounded-xl border border-slate-200/80 p-5 w-full max-w-3xl">
            <div className="flex items-center justify-between mb-7">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600/15 p-2 rounded-xl">
                  <Calendar />
                </span>
                <h1 className="font-bold text-base md:text-xl">
                  {monthName} {budgetData.year}
                </h1>
              </div>
              <button
                onClick={() => navigate(`/budget-form/${budgetData._id}`)}
              >
                <Edit size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:justify-between">
              <div className="bg-white/60 p-2.5 rounded-xl border border-slate-200/80 flex flex-col justify-between flex-1">
                <h2 className="font-semibold text-xs uppercase tracking-wider">
                  Monthly Limit
                </h2>
                <span className="font-mono font-bold text-slate-700 text-lg mt-1">
                  ₹{budgetData.monthlyLimit}
                </span>
              </div>

              <div className="bg-white/60 p-2.5 rounded-xl border border-slate-200/80 flex flex-col justify-between flex-1">
                <h2 className="font-semibold text-xs uppercase tracking-wider">
                  Saving Goal
                </h2>
                <span className="font-mono font-bold text-emerald-600 text-lg mt-1">
                  ₹{budgetData.savingsGoal}
                </span>
              </div>

              <div className="bg-white/60 p-2.5 rounded-xl border border-slate-200/80 flex flex-col justify-between flex-1">
                <h2 className="font-semibold text-xs uppercase tracking-wider">
                  Starting Savings
                </h2>
                <span className="font-mono font-bold text-amber-600 text-lg mt-1">
                  ₹{budgetData.startingSavings}
                </span>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-200 ">
              <div className="py-3 mb-4 flex justify-between items-center">
                <h3 className="font-bold text-lg">Fixed Expenses</h3>
                <span className="text-xs text-slate-500 font-bold">
                  {budgetData.fixedExpenses.length} Expenses
                </span>
              </div>
              {budgetData.fixedExpenses.map((expense) => (
                <div
                  key={expense._id}
                  className="mb-4 flex justify-between bg-white/60 rounded-xl p-3.5"
                >
                  <div className="flex flex-col md:flex-row gap-0.5 md:gap-2 md:items-start">
                    <h4 className="font-bold text-sm md:text-base">
                      {expense.title}
                    </h4>
                    <span className="bg-slate-200 font-semibold text-xs py-1 px-2 rounded-full w-fit">
                      {expense.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 justify-between">
                    <div className="flex justify-end">
                      <button
                        onClick={() =>
                          navigate(
                            `/budget-form/${budgetData._id}?expenseTitle=${expense.title}`,
                          )
                        }
                      >
                        <Edit size={20} />
                      </button>
                    </div>

                    <span className="font-bold font-mono text-sm md:text-base">
                      ₹{expense.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Empty
          icon={<WalletMoney size={48} />}
          title="No Budget Set Up Yet"
          description="You haven't created a budget for this month. Set up your monthly budget to start tracking your expenses and savings."
          button="Set Up Budget"
          onClick={() => navigate("/budget-form")}
        />
      )}
    </>
  );
}

export default Budget;
