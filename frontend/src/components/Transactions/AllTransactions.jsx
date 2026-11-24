import { Trash6 } from "reicon-react";
import {
  getTransactions,
  deleteTransaction,
} from "@/services/transactionService";
import { useEffect, useState } from "react";
import cleanDate from "@/utils/dateformatter";
import { useOutletContext } from "react-router-dom";
import TransactionForm from "./TransactionForm";
import toast from "react-hot-toast";
import Empty from "@/pages/Empty";
import Loader from "../Loader";
import { XCircle } from "reicon-react";

function AllTransactions({ filters, setFilters }) {
  const { refresh } = useOutletContext();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  async function fetchTransactions() {
    try {
      let res = await getTransactions(filters);

      setTransactions(res.data);
      setPagination(res.pagination);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error Fetching Transaction",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [refresh, filters]);

  async function handleDelete(id) {
    try {
      let res = await deleteTransaction(id);
      fetchTransactions();
      toast.success(res.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error Deleting Transaction",
      );
    }
  }

  return (
    <div>
      {isLoading ? (
        <Loader text="Fetching transactions..." />
      ) : transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="bg-[#F5F5F5] rounded-xl p-5 border border-slate-200/80 flex justify-between gap-4 mb-4 "
          >
            <div className="space-y-4 w-full">
              <div className="flex flex-col">
                <h4 className=" font-bold text-base md:text-xl flex items-center gap-2">
                  {transaction.title}
                  <span
                    className={`capitalize hidden md:block font-bold text-[11px] ${
                      transaction.type === "income"
                        ? "text-emerald-600 bg-emerald-600/15 px-2 py-1 rounded-xl"
                        : "text-rose-600 bg-rose-600/15 px-2 py-1 rounded-xl"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </h4>
                <p className="text-xs md:text-sm text-slate-500 line-clamp-1">
                  {transaction.description}
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <span className="bg-slate-200 font-semibold text-xs py-1 px-2 rounded-full w-fit">
                  {transaction.category}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {cleanDate(transaction.date)}
                </span>
              </div>

              <div>
                <span
                  className={`font-mono font-bold text-lg md:text-xl ${
                    transaction.type === "Income"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {transaction.type === "Income" ? "+" : "-"}₹
                  {transaction.amount}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-2">
              <TransactionForm
                mode="edit"
                transaction={transaction}
                onTransactionChange={fetchTransactions}
              />
              <button
                onClick={() => handleDelete(transaction._id)}
                className="text-red-600 cursor-pointer"
              >
                <Trash6 size={20} weight="Filled" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <Empty
          icon={<XCircle size={48} color="#DC2626" />}
          title="No Transaction Found"
          description="Create your first transaction click on the '+' button on the sidebar"
        />
      )}

      {transactions.length > 0 && (
        <div className="flex justify-between">
          <button
            disabled={filters.page === 1}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                page: prev.page - 1,
              }))
            }
          >
            Previous
          </button>

          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            disabled={filters.page === pagination.totalPages}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                page: prev.page + 1,
              }))
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default AllTransactions;
