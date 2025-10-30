// src/pages/Expense.jsx

import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import toast from "react-hot-toast";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import Modal from "../components/Modal";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseOverview from "../components/ExpenseOverview";
import ExpenseList from "../components/ExpenseList";
import AddExpenseForm from "../components/AddExpenseForm";

const Expense = () => {
  useUser();

  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    if (loading && initialLoadComplete) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      if (response.status === 200) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching expense details:", error);
      const errorMessage =
        error.response?.data?.message || "Error fetching expense details";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setInitialLoadComplete(true);
    }
  };

  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expense")
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching expense categories:", error);
      const errorMessage =
        error.response?.data?.message || "Error fetching expense categories";
      toast.error(errorMessage);
    }
  };

  const handleAddExpense = async (expense) => {
    const { name, amount, categoryId, date, icon } = expense;
    if (!name.trim()) {
      toast.error("Please enter an expense name");
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
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        categoryId,
        date,
        icon,
      });
      if (response.status === 201) {
        toast.success("Expense added successfully");
        setOpenAddExpenseModal(false);
        fetchExpenseDetails();
        fetchExpenseCategories();
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      const errorMessage =
        error.response?.data?.message || "Error adding expense";
      toast.error(errorMessage);
      throw error;
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await axiosConfig.delete(
        API_ENDPOINTS.DELETE_EXPENSE(id)
      );
      if (response.status === 204) {
        toast.success("Expense deleted successfully");
        setOpenDeleteAlert({ show: false, data: null });
        fetchExpenseDetails();
        fetchExpenseCategories();
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      const errorMessage =
        error.response?.data?.message || "Error deleting expense";
      toast.error(errorMessage);
      throw error;
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
        responseType: "blob",
      });
      let filename = "Expense_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Expense details downloaded successfully");
      return true;
    } catch (error) {
      console.error("Error downloading expense details:", error);
      const errorMessage =
        error.response?.data?.message || "Error downloading expense details";
      toast.error(errorMessage);
      throw error;
    }
  };

  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.SEND_EXPENSE_EMAIL);
      if (response.status === 200) {
        toast.success("Email with expense details sent successfully");
      }
      return true;
    } catch (error) {
      console.error("Error sending expense email:", error);
      const errorMessage =
        error.response?.data?.message || "Error sending expense email";
      toast.error(errorMessage);
      throw error;
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  if (!initialLoadComplete || loading) {
    return (
      <Dashboard activeMenu="Expense">
        <div className="my-5 mx-auto">
          <div className="text-center p-10 text-gray-500">
            <p>Loading expense data...</p>
          </div>
        </div>
      </Dashboard>
    );
  }

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview
              onAddExpense={() => setOpenAddExpenseModal(true)}
              transactions={expenseData}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
          />
          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <AddExpenseForm
              onAddExpense={(expense) => handleAddExpense(expense)}
              categories={categories}
            />
          </Modal>

          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense?"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
              onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Expense;