import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "reicon-react";
import { Edit } from "reicon-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/schemas/transactionSchema";
import {
  addTransaction,
  updateTransaction,
} from "@/services/transactionService";
import toast from "react-hot-toast";

function TransactionForm({ mode, transaction, onTransactionChange }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm(
    {
      resolver: zodResolver(transactionSchema),
    },
    {
      defaultValues: {
        title: "",
        description: "",
        category: "",
        type: "",
        amount: "",
        date: "",
      },
    },
  );

  useEffect(() => {
    if (mode === "edit" && transaction) {
      reset({
        title: transaction.title,
        description: transaction.description || "",
        category: transaction.category,
        type: transaction.type,
        amount: transaction.amount,
        date: new Date(transaction.date).toISOString().split("T")[0],
      });
    }
  }, [mode, transaction, reset]);

  async function submit(data) {
    try {
      let res;
      if (mode === "add") {
        res = await addTransaction(data);
      } else {
        res = await updateTransaction(transaction._id, data);
      }
      toast.success(res.message);
      reset();
      onTransactionChange();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (mode === "add"
            ? "Failed to create transaction"
            : "Failed to update transaction"),
      );
    }
  }

  const categories = [
    { name: "Food & Dining", value: "food" },
    { name: "Salary", value: "salary" },
    { name: "Shopping", value: "shopping" },
    { name: "Transport", value: "transport" },
    { name: "Bills & Utilities", value: "bills_utilities" },
    { name: "Housing", value: "housing" },
    { name: "Health & Fitness", value: "health_fitness" },
    { name: "Entertainment", value: "entertainment" },
    { name: "Education", value: "education" },
    { name: "Travel", value: "travel" },
    { name: "Personal Care", value: "personal_care" },
    { name: "Subscriptions", value: "subscriptions" },
    { name: "Gifts & Donations", value: "gifts_donations" },
    { name: "Other", value: "other" },
  ];

  return (
    <Dialog>
      <DialogTrigger
        render={
          mode === "add" ? (
            <button
              type="button"
              className="p-2 md:p-3 rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#78d277]"
            >
              <Plus />
            </button>
          ) : (
            <button type="button" className="text-slate-700 cursor-pointer">
              <Edit size={20} />
            </button>
          )
        }
      />
      <DialogContent className="sm:max-w-xl">
        <form onSubmit={handleSubmit(submit)}>
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Add Transaction" : "Edit Transaction"}
            </DialogTitle>
            <DialogDescription>
              {mode === "add"
                ? " Add a new income or expense to your transactions."
                : "Update your transaction details."}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto px-2 py-4 my-4 scrollbar-none">
            <FieldGroup>
              <Field>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} />
                {errors.title && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.title.message}
                  </p>
                )}
              </Field>

              <Field>
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="category"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      items={categories}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categories.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                ></Controller>
                {errors.category && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.category.message}
                  </p>
                )}
              </Field>

              <Field>
                <Label htmlFor="type">Type</Label>
                <Controller
                  name="type"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose Type" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Income">Income</SelectItem>
                          <SelectItem value="Expense">Expense</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.type.message}
                  </p>
                )}
              </Field>

              <Field>
                <Label htmlFor="description">Description</Label>
                <Textarea {...register("description")} />
              </Field>
              <Field>
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" {...register("amount")} />
                {errors.amount && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.amount.message}
                  </p>
                )}
              </Field>

              <Field>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" {...register("date")} />
                {errors.date && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.date.message}
                  </p>
                )}
              </Field>
            </FieldGroup>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">
              {mode === "add" ? "Add Transaction" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TransactionForm;
