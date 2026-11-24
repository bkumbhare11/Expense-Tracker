import { useEffect, useState } from "react";
import PageHeader from "../PageHeader";
import { getMonthlyReports } from "@/services/reportsService.js";
import toast from "react-hot-toast";
import Loader from "../Loader";
import Empty from "@/pages/Empty";
import { BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Report() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
    async function fetchReports() {
      try {
        setLoading(true);
        const res = await getMonthlyReports();
        setReportsData(res.data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load reports");
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  return (
    <>
      <PageHeader
        title="Financial Reports"
        subtitle="Get a clear picture of your financial activity and spending habits."
      />

      {/* 3. Teeno states ka flow: Loading -> Empty -> Data */}
      {loading ? (
        <Loader text="Fetching reports..." />
      ) : reportsData.length === 0 ? (
        <Empty
          icon={<BarChart3 size={44} className="text-slate-700" />}
          title="No Financial Reports Yet"
          description="Add transactions or set a monthly budget to generate your monthly reports."
          button="Set Budget"
          onClick={() => navigate("/budget-form")}
        />
      ) : (
        <div className="flex flex-wrap gap-5 mt-6">
          {reportsData.map((report) => {
            const percentage = report.budget?.budgetUsedPercentage ?? 0;
            const barWidth = Math.min(Math.round(percentage), 100);

            return (
              <div
                key={`${report.year}-${report.month}`}
                className="bg-[#F5F5F5] rounded-xl border border-slate-200/80 p-5 w-full max-w-sm"
              >
                <div className="font-bold flex items-center gap-1.5 text-lg">
                  <span>{months[report.month - 1]}</span>
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

                      <div className="h-2 rounded-xl bg-slate-300 w-full overflow-hidden">
                        <div
                          style={{ width: `${barWidth}%` }}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            percentage > 100 ? "bg-rose-600" : "bg-slate-900"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Report;
