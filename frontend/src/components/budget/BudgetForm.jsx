import PageHeader from "../PageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "reicon-react";
import { Trash2 } from "reicon-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  getBudgetById,
  updateBudget,
  createBudget,
} from "@/services/budgetService";
import { useForm } from "react-hook-form";
import BudgetInfo from "@/pages/BudgetInfo";
import { useNavigate } from "react-router-dom";

function BudgetForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const expenseTitle = searchParams.get("expenseTitle");
  const [showForm, setShowForm] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
  });
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (!id) {
      return;
    }
    setShowForm(true);

    async function fetchBudgetById() {
      const res = await getBudgetById(id);
      setExpenseData(res.data.fixedExpenses);
      reset({
        monthlyLimit: res.data.monthlyLimit,
        savingsGoal: res.data.savingsGoal,
        startingSavings: res.data.startingSavings,
      });
      setIsEditMode(true);

      if (expenseTitle) {
        let data = res.data.fixedExpenses.find(
          (expense) => expense.title === expenseTitle,
        );
        console.log(data);
        setExpense(data);
        setTitle(data.title);
      }
    }

    fetchBudgetById();
  }, [id, expenseTitle]);

  function submitExpense() {
    if (
      expense.title.trim() === "" ||
      expense.amount === "" ||
      Number(expense.amount) <= 0 ||
      expense.category === ""
    ) {
      setAlertMessage("Please fill all expense fields correctly");
      return;
    }

    if (isEditMode) {
      let data = {
        ...expense,
        amount: Number(expense.amount),
      };

      setExpenseData((prev) =>
        prev.map((expense) => (expense.title === title ? data : expense)),
      );
      setIsEditMode(false);
      setExpense({
        title: "",
        amount: "",
        category: "",
      });
      return;
    }

    setExpenseData((prev) => [
      ...prev,
      { ...expense, amount: Number(expense.amount) },
    ]);

    setExpense({
      title: "",
      amount: "",
      category: "",
    });
  }

  async function submitForm(data) {
    let formData = {
      monthlyLimit: Number(data.monthlyLimit),
      savingsGoal: Number(data.savingsGoal),
      startingSavings: Number(data.startingSavings),
      fixedExpenses: expenseData,
    };

    if (isEditMode) {
      await updateBudget(id, formData);
      navigate("/budget");
    } else {
      await createBudget(formData);
      navigate("/budget");
    }
  }

  function editExpense(data) {
    setIsEditMode(true);
    setExpense(data);
    setTitle(data.title);
  }

  const categories = [
    { label: "Category", value: null },
    { label: "Food & Dining", value: "food" },
    { label: "Salary", value: "salary" },
    { label: "Shopping", value: "shopping" },
    { label: "Transport", value: "transport" },
    { label: "Bills & Utilities", value: "bills_utilities" },
    { label: "Housing", value: "housing" },
    { label: "Health & Fitness", value: "health_fitness" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Education", value: "education" },
    { label: "Travel", value: "travel" },
    { label: "Personal Care", value: "personal_care" },
    { label: "Subscriptions", value: "subscriptions" },
    { label: "Gifts & Donations", value: "gifts_donations" },
    { label: "Other", value: "other" },
  ];
  return (
    <>
      <PageHeader
        title="Budget & Savings Form"
        subtitle="Set your monthly budget, savings goal, and fixed expenses."
      />
      {showForm ? (
        <form
          onSubmit={handleSubmit(submitForm)}
          className="bg-[#F5F5F5] rounded-xl border border-slate-200/80 p-5 w-full max-w-3xl mx-auto"
        >
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="monthlyLimit">Monthly Limit</Label>
              <Input
                id="monthlyLimit"
                type="number"
                {...register("monthlyLimit")}
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="15000"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="savingsGoal">Savings Goal</Label>
              <Input
                id="savingsGoal"
                type="number"
                {...register("savingsGoal")}
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="3000"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startingSavings">Starting Savings</Label>
              <Input
                id="startingSavings"
                type="number"
                {...register("startingSavings")}
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="5000"
                required
              />
            </div>
          </div>

          <div className="mt-7 space-y-4 border border-slate-300 p-3 rounded-xl">
            <h3 className="font-bold">Fixed Expenses</h3>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={expense.title}
                onChange={(e) =>
                  setExpense({ ...expense, title: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={expense.amount}
                onChange={(e) =>
                  setExpense({ ...expense, amount: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                items={categories}
                value={expense.category}
                onValueChange={(value) =>
                  setExpense({ ...expense, category: value })
                }
              >
                <SelectTrigger className="w-full ">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Choose a category</SelectLabel>
                    {categories.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {alertMessage && (
              <div>
                <p className="text-red-500 font-bold text-xs">{alertMessage}</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={submitExpense}
                className="bg-black text-white text-sm px-4 py-3 font-bold rounded-xl active:scale-95 cursor-pointer hover:bg-slate-700 hover:text-white transition-all duration-300 ease-in-out"
              >
                {isEditMode ? "Update Expense" : "Add Fixed Expense"}
              </button>
            </div>
          </div>

          {expenseData.length > 0 && (
            <div className="flex flex-col gap-4 mt-5">
              {expenseData.map((expense) => (
                <div
                  key={expense.title}
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
                    <span className="font-bold font-mono text-sm md:text-base">
                      ₹{expense.amount}
                    </span>

                    <div className="space-x-2.5">
                      <button
                        type="button"
                        onClick={() => editExpense(expense)}
                      >
                        <Edit size={20} />
                      </button>
                      <button>
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-black text-white text-lg px-4 py-3 font-bold rounded-xl active:scale-95 cursor-pointer hover:bg-slate-700 hover:text-white transition-all duration-300 ease-in-out"
            >
              {isEditMode ? "Update Budget" : "Save Budget"}
            </button>
          </div>
        </form>
      ) : (
        <BudgetInfo setShowForm={setShowForm} />
      )}
    </>
  );
}

export default BudgetForm;
