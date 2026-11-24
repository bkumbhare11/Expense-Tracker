import { setupMonthlyBudget } from "@/services/budgetService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function BudgetInfo({ setShowForm }) {
  const navigate = useNavigate();

  async function budgetSetup() {
    try {
      let res = await setupMonthlyBudget();

      if (res.setupRequired) {
        setShowForm(true);
      } else {
        setShowForm(false);
        navigate("/budget");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed To Setup Budget");
    }
  }

  return (
    <div className="mt-10 bg-[#F5F5F5] rounded-xl border border-slate-200/80 p-5 w-full max-w-2xl mx-auto">
      <div>
        <h2 className="font-bold text-base sm:text-xl space-y-0.5">
          Ready to plan your month?{" "}
        </h2>
        <p className="text-slate-700 font-medium text-xs sm:text-sm">
          Set up your monthly budget to keep track of your expenses and savings.
        </p>
      </div>

      <div className="my-3">
        <h4 className="font-semibold mb-1">How it works</h4>
        <div className="text-xs sm:text-sm text-slate-700 font-medium space-y-2">
          <p>
            if you created a budget last month, your previous budget details
            will be carried forward. You can review and edit them before saving
            your new monthly budget.
          </p>
          <p>
            If you don't have a previous budget, we'll show you a fresh budget
            form to get started.
          </p>
        </div>
      </div>

      <button
        onClick={budgetSetup}
        className="bg-black text-white text-sm sm:text-base w-fit px-4 py-2 rounded-xl font-semibold cursor-pointer active:scale-95 transition-all duration-300 ease-in-out hover:bg-slate-700"
      >
        Set Up Monthly Budget
      </button>
    </div>
  );
}

export default BudgetInfo;
