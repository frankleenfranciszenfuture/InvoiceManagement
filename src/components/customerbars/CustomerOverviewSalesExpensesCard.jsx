import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFiscalPeriod } from "../../slices/dashboardSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { HelpCircle, ChevronDown } from "lucide-react";

const formatAmount = (amount) =>
  `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CustomTick = ({ x, y, payload, data }) => {
  const point = data[payload.index];
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={12}
        textAnchor="middle"
        fontSize={11}
        fill="#6b7280"
      >
        {point.month}
      </text>
      <text
        x={0}
        y={0}
        dy={26}
        textAnchor="middle"
        fontSize={11}
        fill="#9ca3af"
      >
        {point.year}
      </text>
    </g>
  );
};

export default function CustomerOverviewSalesExpensesCard() {
  const dispatch = useDispatch();
  const { selectedCustomer } = useSelector((state) => state.customer);

  const totalSales = selectedCustomer?.totalSales ?? 0;
  const totalReceipts = selectedCustomer?.totalReceipts ?? 0;
  const totalExpenses = selectedCustomer?.totalExpenses ?? 0;
  const chartData = selectedCustomer?.salesExpensesChart ?? [];

  const fiscalPeriod = useSelector((state) => state.dashboard.fiscalPeriod);


  return (
    <div className="border border-gray-200 rounded-md bg-white mt-5">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800 flex items-center gap-1.5">
          Sales and Expenses
          <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        </h2>
        <div className="relative">
          <select
            value={fiscalPeriod}
            onChange={(e) => dispatch(setFiscalPeriod(e.target.value))}
            className="appearance-none bg-transparent text-sm text-gray-600 pr-5 outline-none cursor-pointer"
          >
            <option>This Fiscal Year</option>
            <option>Last Fiscal Year</option>
            <option>This Month</option>
            <option>Last Month</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="flex overflow-hidden">
        <div
          className="flex-1 min-w-0 pl-2 pt-6 pb-4 pr-2"
          style={{ height: 280 }}
        >
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={chartData}
              margin={{ top: 0, right: 20, bottom: 10, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f1f1"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={(props) => <CustomTick {...props} data={chartData} />}
                interval={0}
                height={40}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000} K`)}
                domain={[0, 5000]}
                ticks={[0, 1000, 2000, 3000, 4000, 5000]}
              />
              <Tooltip
                formatter={(value, name) => [
                  formatAmount(value),
                  name === "sales" ? "Sales" : "Expenses",
                ]}
                labelFormatter={(label, payload) =>
                  payload && payload[0]
                    ? `${payload[0].payload.month} ${payload[0].payload.year}`
                    : label
                }
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#dc2626"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="w-[180px] border-l border-gray-100 py-6 px-5 space-y-6 flex-shrink-0">
          <div>
            <p className="text-sm text-blue-600 font-medium mb-1">
              Total Sales
            </p>
            <p className="text-lg text-gray-800">{formatAmount(totalSales)}</p>
          </div>
          <div>
            <p className="text-sm text-green-700 font-medium mb-1">
              Total Receipts
            </p>
            <p className="text-lg text-gray-800">
              {formatAmount(totalReceipts)}
            </p>
          </div>
          <div>
            <p className="text-sm text-red-600 font-medium mb-1">
              Total Expenses
            </p>
            <p className="text-lg text-gray-800">
              {formatAmount(totalExpenses)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
