import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";
import { Pie3 } from "reicon-react";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { AlertCircle } from "reicon-react";

function SpendingChart({ categoryExpense }) {
  let data;
  let total;

  if (categoryExpense.length > 0) {
    data = categoryExpense.map((item) => ({
      name: item._id,
      value: item.total,
    }));
    total = data.reduce((sum, item) => sum + item.value, 0);
  }

  const CATEGORY_COLORS = {
    food: "#F59E0B",
    salary: "#10B981",
    shopping: "#8B5CF6",
    transport: "#3B82F6",
    bills_utilities: "#EF4444",
    housing: "#F97316",
    health_fitness: "#14B8A6",
    entertainment: "#EC4899",
    education: "#6366F1",
    travel: "#06B6D4",
    personal_care: "#A855F7",
    subscriptions: "#64748B",
    gifts_donations: "#E11D48",
    other: "#78716C",
  };
  return (
    <div className="bg-[#F5F5F5] rounded-xl border border-slate-200/80 p-5 w-full  max-w-sm">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6">
        <span className="p-2 bg-purple-600/15 rounded-xl">
          <Pie3 color="#ad46ff" />
        </span>
        <h3 className="text-[16px] md:text-lg font-bold">
          Spending By Category
        </h3>
      </div>

      {categoryExpense.length > 0 ? (
        <div className="flex flex-col justify-between gap-2 ">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="80%"
                outerRadius="100%"
                cornerRadius="50%"
                paddingAngle={5}
              >
                {data &&
                  data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CATEGORY_COLORS[entry.name]}
                    />
                  ))}

                <Label
                  value={`₹${total}`}
                  position="center"
                  fill="#0f172a"
                  className="text-xl font-bold"
                />
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#e2e2e2",
                  border: "2px solid black",
                  borderRadius: "10px",
                  color: "#00000",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div>
            {data &&
              data.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-7"
                >
                  <div className="flex items-center gap-2">
                    <RiCheckboxBlankFill
                      style={{ color: CATEGORY_COLORS[entry.name] }}
                    />
                    <span className="font-bold">{entry.name}</span>
                  </div>
                  <span className="font-mono font-semibold">
                    ₹{entry.value}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3 flex flex-col items-center">
          <span>
            <AlertCircle size={32} color="" />
          </span>
          <h4 className="font-bold text-sm sm:text-base">
            No Expense Data Yet
          </h4>
          <p className="text-slate-700 text-xs sm:text-sm text-center">
            Your category-wise expense breakdown will appear here once you start
            adding expenses.
          </p>
        </div>
      )}
    </div>
  );
}

export default SpendingChart;
