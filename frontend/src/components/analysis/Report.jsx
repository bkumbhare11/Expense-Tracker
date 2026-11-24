import { useEffect, useState } from "react";
import PageHeader from "../PageHeader";
import { getMonthlyReports } from "@/services/reportsService.js";
import toast from "react-hot-toast";
import Loader from "../Loader";

function Report() {
  const [reportsData, setReportsData] = useState([]);

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
    async function fetchMonthlyReports() {
      try {
        let res = await getMonthlyReports();
        setReportsData(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error Fetching Reports");
      }
    }
    fetchMonthlyReports();
  }, []);

  return (
    <>
      <PageHeader
        title="Financial Reports"
        subtitle="Get a clear picture of your financial activity and spending habits."
      />

      <div className="flex flex-wrap gap-2">
        {reportsData.length > 0 ? (
          reportsData.map((report, index) => (
            <div
              key={index}
              className="bg-[#F5F5F5] rounded-xl border border-slate-200/80 p-5 w-full max-w-sm"
            >
              <div className="font-bold flex items-center gap-0.5 text-lg">
                <span> {months[report.month - 1]}</span>
                <span>{report.year}</span>
              </div>

              <div className="mt-4">
                <div className="space-y-2">
                  <div className="font-semibold flex justify-between items-center">
                    <span>Income</span>
                    <span className="text-emerald-600 font-mono">
                      ₹{report.totalIncome.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="font-semibold flex justify-between items-center">
                    <span>Expense</span>
                    <span className="text-rose-600 font-mono">
                      ₹{report.totalExpense.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="font-semibold flex justify-between items-center">
                    <span>Savings</span>
                    <span className="text-amber-600 font-mono">
                      ₹{report.netSavings.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="mt-7 space-y-2">
                  <div className="font-semibold flex justify-between items-center">
                    <span>Budget</span>
                    <span className="font-mono">
                      {report.budget?.monthlyLimit != null
                        ? `₹${report.budget.monthlyLimit.toLocaleString("en-IN")}`
                        : "Not Set"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="font-semibold flex justify-between items-center">
                      <span>Used</span>
                      <span className="font-mono">
                        {report.budget?.budgetUsedPercentage != null
                          ? `${report.budget.budgetUsedPercentage.toFixed(0)}%`
                          : "Not Set"}
                      </span>
                    </div>

                    <div className="h-2 rounded-xl bg-slate-300 w-full flex items-center">
                      <div
                        style={{
                          width: `${
                            report.budget.budgetUsedPercentage &&
                            report.budget.budgetUsedPercentage > 100
                              ? 100
                              : report.budget.budgetUsedPercentage
                                ? Number(
                                    report.budget.budgetUsedPercentage,
                                  ).toFixed(0)
                                : 0
                          }%`,
                        }}
                        className="w-full h-2 bg-slate-900 rounded-full "
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default Report;
