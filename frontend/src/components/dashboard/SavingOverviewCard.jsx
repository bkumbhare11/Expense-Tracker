import { WalletMoney } from "reicon-react";

function SavingOverviewCard({ summary }) {
  return (
    <div className="bg-[#F5F5F5] rounded-xl border border-slate-200/80 p-5 w-full max-w-lg">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6">
        <span className="p-2 bg-amber-600/15 rounded-xl">
          <WalletMoney color="#f54900" weight="Filled" />
        </span>
        <h3 className="text-[16px] md:text-lg font-bold">Savings Overview</h3>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center font-medium">
          <span>Starting Savings</span>
          <span className="font-mono text-amber-600 font-semibold">
            ₹
            {summary.startingSavings
              ? summary.startingSavings.toLocaleString("en-IN")
              : 0}
          </span>
        </div>

        <div className="flex justify-between items-center font-medium pb-2">
          <span>This Month</span>
          <span className="font-mono text-emerald-600 font-semibold">
            ₹
            {summary.currentMonthSavings &&
              summary.currentMonthSavings.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center font-bold pt-2 border-t border-slate-300 text-[16px] md:text-lg">
        <span>Total Savings</span>
        <span className="font-mono">
          ₹
          {summary.totalSavings && summary.totalSavings.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
}

export default SavingOverviewCard;
