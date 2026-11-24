import { ChartTrend } from "reicon-react";

function SpendingOverviewCard({ summary }) {
  return (
    <>
      <div className="bg-[#F5F5F5] rounded-xl border border-slate-200/80 p-5 w-full max-w-lg">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 mb-6">
          <span className="p-2 bg-sky-500/15 rounded-xl">
            <ChartTrend color="#0084d1" weight="Filled" />
          </span>
          <h3 className="text-[16px] md:text-lg font-bold">
            Spending Overview
          </h3>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center font-medium">
            <span>Total Income</span>
            <span className="font-mono text-emerald-600 font-semibold">
              ₹
              {summary.totalIncome &&
                summary.totalIncome.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between items-center font-medium pb-2">
            <span>Total Expense</span>
            <span className="font-mono text-rose-600 font-semibold">
              -₹
              {summary.totalExpense &&
                summary.totalExpense.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center font-bold pt-2 border-t border-slate-300 text-[16px] md:text-lg">
          <span>Balance</span>
          <span className="font-mono">
            ₹{summary.balance && summary.balance.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </>
  );
}

export default SpendingOverviewCard;
