import { Trophy } from "reicon-react";
import { Link } from "react-router-dom";
import savingStatus from "@/utils/savingStatus";

function MonthlySavingsCard({ summary }) {
  let progressData = savingStatus(summary.savingsProgress);
  return (
    <div className="bg-[#F5F5F5] rounded-xl border border-slate-200/80 p-5 w-full max-w-xl">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6">
        <span className="p-2 bg-emerald-600/15 rounded-xl">
          <Trophy color="#10B981" weight="Filled" />
        </span>
        <h3 className="text-[16px] md:text-lg font-bold">
          Savings Goal Tracker
        </h3>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-1 font-medium text-sm md:text-[16px]">
            <span>Goal:</span>
            <span className="font-mono font-semibold text-slate-700">
              ₹
              {summary.savingsGoal &&
                summary.savingsGoal.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center gap-1 font-medium text-sm md:text-[16px]">
            <span>Saved:</span>
            <span className="font-mono font-semibold text-emerald-600">
              ₹
              {summary.currentMonthSavings &&
                summary.currentMonthSavings.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="h-2 rounded-xl bg-slate-300 w-full flex items-center">
              <div
                style={{
                  width: `${
                    summary.savingsProgress && summary.savingsProgress > 100
                      ? 100
                      : summary.savingsProgress
                        ? Number(summary.savingsProgress).toFixed(1)
                        : 0
                  }%`,
                }}
                className={`h-2 rounded-xl ${progressData.barColor}`}
              ></div>
            </div>

            <span className="font-mono font-bold text-sm">
              {summary.savingsProgress && summary.savingsProgress > 100
                ? "100"
                : summary.savingsProgress && summary.savingsProgress.toFixed(1)}
              %
            </span>
          </div>
          <span
            className={`text-xs md:text-sm font-bold ${progressData.textColor}`}
          >
            {progressData.message}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-1 font-medium text-sm md:text-[16px]">
            <span>Remaining Amount:</span>
            {summary.remainingAmount > 0 && (
              <span className="font-mono font-semibold text-rose-600">
                ₹
                {summary.remainingAmount &&
                  summary.remainingAmount.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <Link
            to="/budget"
            className="text-blue-500 text-xs font-bold hover:underline"
          >
            View Goal
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MonthlySavingsCard;
