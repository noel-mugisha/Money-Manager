import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import toast from "react-hot-toast";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import IncomeList from "../components/IncomeList";
import { Plus } from "lucide-react";
import Modal from "../components/Modal";
import AddIncomForm from "../components/AddIncomeForm";

const Income = () => {
  useUser();

  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status === 200) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error fetching income details:", error);
      const errorMessage =
        error.response?.data?.message || "Error fetching income details";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("income")
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching income categories:", error);
      const errorMessage =
        error.response?.data?.message || "Error fetching income categories";
      toast.error(errorMessage);
    }
  };

  const handleAddIncome = async (income) => {
    const { name, amount, categoryId, date, icon } = income;
    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("Date cannot be in the future");
      return;
    }
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        categoryId,
        date,
        icon,
      });
      if (response.status === 201) {
        toast.success("Income added successfully");
        setOpenAddIncomeModal(false);
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
    } catch (error) {
      console.error("Error adding income:", error);
      const errorMessage =
        error.response?.data?.message || "Error adding income";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview for income with line chart*/}
            <button
              onClick={() => setOpenAddIncomeModal(true)}
              className="add-btn flex items-center gap-1"
            >
              <Plus size={15} className="text-lg" /> Add Income
            </button>
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => console.log("deleting income", id)}
          />
          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <AddIncomForm
              onAddIncome={(income) => handleAddIncome(income)}
              categories={categories}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;
