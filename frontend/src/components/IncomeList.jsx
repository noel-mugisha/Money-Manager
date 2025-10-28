import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between p-4">
        <h5 className="text-lg font-semibold text-gray-800">Income Sources</h5>
        <div className="flex items-center justify-end gap-3">
          <button className="card-btn">
            <Mail size={18} />
            Email
          </button>

          <button className="card-btn bg-purple-50 border-purple-300 text-purple-800 shadow-sm">
            <Download size={18} />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Render your transactions here */}
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income.id}
            icon={income.icon}
            title={income.name}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
