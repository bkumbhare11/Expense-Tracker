import { Speedometer } from "reicon-react";
import { Link } from "react-router-dom";
import budgetStatus from "@/utils/budgetStatus";

function MonthlyBudgetCard({ summary }) {
  const budgetData = budgetStatus(summary.budgetProgress);
  return (
    <>
      <div className="bg-[#F5F5F5] rounded-xl border border-slate-200/80 p-5 w-full max-w-xl">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6">
          <span className="p-2 bg-indigo-500/15 rounded-xl">
            <Speedometer color="#6366F1" weight="Filled" />
          </span>
          <h3 className="text-[16px] md:text-lg font-bold">
            Monthly Usage & Limit
          </h3>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="flex justify-between">
            <div className="flex items-center gap-1 font-medium text-sm md:text-[16px]">
              <span>Limit:</span>
              <span className="font-mono font-semibold text-slate-700">
                ₹
                {summary.monthlyLimit &&
                  summary.monthlyLimit.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center gap-1 font-medium text-sm md:text-[16px]">
              <span>Used:</span>
              <span className="font-mono font-semibold text-rose-600">
                ₹
                {summary.budgetUsed &&
                  summary.budgetUsed.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="h-2 rounded-xl bg-slate-300 w-full flex items-center">
                <div
                  style={{
                    width: `${
                      summary.budgetProgress && summary.budgetProgress > 100
                        ? 100
                        : summary.budgetProgress
                          ? Number(summary.budgetProgress).toFixed(1)
                          : 0
                    }%`,
                  }}
                  className={`h-2 w-[70%] rounded-xl bg-blue-500 ${budgetData.barColor}`}
                ></div>
              </div>

              <span className="font-mono font-bold text-sm">
                {summary.budgetProgress && summary.budgetProgress.toFixed(1)}%
              </span>
            </div>
            <span
              className={`text-xs md:text-sm font-bold ${budgetData.textColor}`}
            >
              {budgetData.message}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-1 font-medium text-sm md:text-[16px]">
              <span>Remaining Budget:</span>
              <span className="font-mono font-semibold text-amber-600">
                ₹
                {summary.budgetRemaining &&
                  summary.budgetRemaining.toLocaleString("en-IN")}
              </span>
            </div>

            <Link
              to={"/budget"}
              className="text-blue-500 text-xs font-bold hover:underline"
            >
              View Budget
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MonthlyBudgetCard;
