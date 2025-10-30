
import { Download, Mail, LoaderCircle } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [emailLoading, setEmailLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleEmail = async () => {
    setEmailLoading(true);
    try {
      await onEmail();
    // eslint-disable-next-line no-unused-vars
    } catch(error) {
      // Error is handled and toasted in the parent component
    } finally {
      setEmailLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloadLoading(true);
    try {
      await onDownload();
    // eslint-disable-next-line no-unused-vars
    } catch(e) {
      // Error is handled and toasted in the parent component
    } finally {
      setDownloadLoading(false);
    }
  };

  const anyLoading = emailLoading || downloadLoading;

  return (
    <div className="card">
      <div className="flex items-center justify-between p-4">
        <h5 className="text-lg font-semibold text-gray-800">Expense History</h5>
        <div className="flex items-center justify-end gap-3">
          <button
            disabled={anyLoading}
            onClick={handleEmail}
            className={`card-btn flex items-center justify-center gap-2 ${anyLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {emailLoading ? (
              <>
                <LoaderCircle className="w-5 h-5 animate-spin" />
                <span className="ml-1">Emailing...</span>
              </>
            ) : (
              <>
                <Mail size={18} />
                Email
              </>
            )}
          </button>

          <button
            disabled={anyLoading}
            onClick={handleDownload}
            className={`card-btn bg-purple-50 border-purple-300 text-purple-800 shadow-sm flex items-center justify-center gap-2 ${anyLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {downloadLoading ? (
              <>
                <LoaderCircle className="w-5 h-5 animate-spin" />
                <span className="ml-1">Downloading...</span>
              </>
            ) : (
              <>
                <Download size={18} />
                Download
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense.id}
            icon={expense.icon}
            title={expense.name}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;