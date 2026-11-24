import { Arrow2 } from "reicon-react";
import cleanDate from "@/utils/dateformatter";

function RecentTransactions({ transactions }) {
  return (
    <>
      {transactions.length > 0 && (
        <div className="bg-[#F5F5F5] rounded-xl border border-slate-200/80 p-5 w-full">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6">
            <span className="p-2 bg-slate-700/15 rounded-xl">
              <Arrow2 color="#0f172b" />
            </span>
            <h3 className="text-[16px] md:text-lg font-bold">
              Recent Transactions
            </h3>
          </div>

          <div>
            {transactions.map((transaction) => (
              <div key={transaction._id} className="">
                <div className="flex justify-between mb-3">
                  <div>
                    <p className="font-semibold">{transaction.title}</p>
                    <p className="text-slate-500 text-xs font-bold">
                      {cleanDate(transaction.date)}
                    </p>
                  </div>
                  <p className="font-mono font-medium text-sm">
                    ₹{transaction.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default RecentTransactions;
