import { Search4 } from "reicon-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SearchBar({ filters, setFilters }) {
  const types = [
    { label: "Type", value: null },
    { label: "Income", value: "Income" },
    { label: "Expense", value: "Expense" },
  ];

  const sort = [
    { label: "Sort", value: null },
    { label: "Latest", value: "latest" },
    { label: "Oldest", value: "Oldest" },
    { label: "Amount High", value: "amountHigh" },
    { label: "Amount Low", value: "amountLow" },
  ];

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
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <div className="bg-[#F5F5F5] rounded-full border border-slate-200/80 w-full flex items-center px-3 focus-within:border-slate-700">
        <label htmlFor="search">
          <Search4 />
        </label>
        <input
          id="search"
          type="text"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              search: e.target.value,
              page: 1,
            }))
          }
          placeholder="Search by title"
          className="w-full px-3 py-2 md:py-3 focus:outline-none"
        />
      </div>

      <div className="flex gap-2">
        <Select
          items={types}
          onValueChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              type: value,
              page: 1,
            }))
          }
        >
          <SelectTrigger className="w-full max-w-48 bg-[#F5F5F5] rounded-full shadow-none md:py-6">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a type</SelectLabel>
              {types.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          items={sort}
          value={filters.sort}
          onValueChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              sort: value,
              page: 1,
            }))
          }
        >
          <SelectTrigger className="w-full max-w-48 bg-[#F5F5F5] rounded-full shadow-none md:py-6">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              {sort.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Select
          items={categories}
          onValueChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              category: value,
              page: 1,
            }))
          }
        >
          <SelectTrigger className="w-full max-w-48 bg-[#F5F5F5] rounded-full shadow-none md:py-6">
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
    </div>
  );
}

export default SearchBar;
