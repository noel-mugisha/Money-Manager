import { Search, X, LoaderCircle, Inbox } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";

const Filter = () => {
  useUser();

  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleClearFilters = () => {
    setType("income");
    setStartDate("");
    setEndDate("");
    setKeyword("");
    setSortOrder("desc");
    setTransactions([]);
    setHasSearched(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
        type,
        startDate,
        endDate,
        keyword,
        sortOrder,
      });
      if (response.status === 200) {
        setTransactions(response.data);
      }
    } catch (error) {
      console.log("Error fetching transactions", error);
      toast.error(error.response?.data?.message || "Error fetching transactions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Filter">
      <div className="my-5 mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Filter Transactions
          </h2>
          <p className="text-gray-500 mt-1">
            Refine your search to find exactly what you're looking for.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="type"
                >
                  Type
                </label>
                <select
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                  id="type"
                  className="w-full mt-1 block px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-150 ease-in-out"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="startdate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <input
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  type="date"
                  id="startdate"
                  className="w-full mt-1 block px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-150 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="enddate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <input
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  id="enddate"
                  className="w-full mt-1 block px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-150 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="sortorder"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sort Order
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  id="sortorder"
                  className="w-full mt-1 block px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-150 ease-in-out"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="keyword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Search by Keyword
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    id="keyword"
                    type="text"
                    className="w-full mt-1 block pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition duration-150 ease-in-out"
                    placeholder="Search by name, category, etc..."
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-8 pt-6 flex items-center justify-end gap-4">
              <button
                onClick={handleClearFilters}
                type="button"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                <X size={16} />
                Clear Filters
              </button>
              <button
                disabled={loading}
                type="submit"
                className="flex items-center justify-center gap-2 min-w-[140px] px-6 py-2 text-sm font-medium text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 cursor-pointer shadow-md disabled:bg-purple-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" size={16} />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Apply Filters</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">
              {hasSearched ? `Results (${transactions.length})` : "Results"}
            </h3>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <LoaderCircle className="w-8 h-8 animate-spin mb-3 text-purple-600" />
                <p className="text-lg font-medium">Fetching Transactions...</p>
                <p className="text-sm">Please wait a moment.</p>
              </div>
            ) : transactions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                {transactions.map((transaction) => (
                  <TransactionInfoCard
                    key={transaction.id}
                    title={transaction.name}
                    icon={transaction.icon}
                    date={moment(transaction.date).format("Do MMM YYYY")}
                    amount={transaction.amount}
                    type={transaction.type || type}
                    hideDeleteBtn
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500 text-center">
                <Inbox className="w-12 h-12 mb-4 text-gray-400" />
                <h4 className="text-lg font-semibold text-gray-700">
                  {hasSearched ? "No Transactions Found" : "Find Your Transactions"}
                </h4>
                <p className="max-w-xs mt-1 text-sm">
                  {hasSearched
                    ? "Your search did not match any transactions. Try adjusting your filters."
                    : "Use the filters above and click 'Apply Filters' to see your results."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;