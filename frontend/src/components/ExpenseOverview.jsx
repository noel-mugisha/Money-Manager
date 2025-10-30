// src/components/ExpenseOverview.jsx

import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../utils/utils";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-xl font-semibold text-gray-800">
            Expense Overview
          </h5>
          <p className="text-sm text-gray-500 mt-1">
            Track your spendings over time and analyze your expense trends.
          </p>
        </div>
        <button
          onClick={onAddExpense}
          className="add-btn flex items-center gap-1"
        >
          <Plus size={15} className="text-lg" /> Add Expense
        </button>
      </div>
      <div className="mt-8 h-80">
        {chartData && chartData.length > 0 ? (
          <CustomLineChart data={chartData} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No expense data available for chart.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseOverview;