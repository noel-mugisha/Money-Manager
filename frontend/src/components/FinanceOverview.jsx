import { addThousandsSeparator } from "../utils/utils";
import CustomPieChart from "./CustomPieChart";

const FinanceOverview = ({ totalIncome, totalExpense, totalBalance }) => {
  const COLORS = ["#59168B", "#a0090e", "#016630"]; // Purple, Red, Green

  const balanceData = [
    { name: "Total Balance", amount: totalBalance > 0 ? totalBalance : 0 },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-semibold text-gray-800">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`RwF ${addThousandsSeparator(totalBalance)}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;