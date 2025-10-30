import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import toast from "react-hot-toast";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import AddIncomForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";

const Income = () => {
  useUser();

  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading && initialLoadComplete) return;
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
      setInitialLoadComplete(true);
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
      throw error;
    }
  };

  const deleteIncome = async (id) => {
    try {
      const response = await axiosConfig.delete(
        API_ENDPOINTS.DELETE_INCOME(id)
      );
      if (response.status === 204) {
        toast.success("Income deleted successfully");
        setOpenDeleteAlert({ show: false, data: null });
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
    } catch (error) {
      console.error("Error deleting income:", error);
      const errorMessage =
        error.response?.data?.message || "Error deleting income";
      toast.error(errorMessage);
      throw error; 
    }
  };


  const handleDownloadIncomeDetails = async() => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {
        responseType: "blob",
      });
      let filename = "Income_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Income details downloaded successfully"); 
      
      return true; 
    } catch (error) {
      console.error("Error downloading income details:", error);
      const errorMessage =
        error.response?.data?.message || "Error downloading income details";
      toast.error(errorMessage);
      throw error; 
    }
  }

  const handleEmailIncomeDetails = async() => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.SEND_INCOME_EMAIL);
      if (response.status === 200) {
        toast.success("Email sent successfully");
      }
      return true; 
    } catch (error) {
      console.error("Error sending income email:", error);
      const errorMessage =
        error.response?.data?.message || "Error sending income email";
      toast.error(errorMessage);
      throw error; 
    }
  }

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  if (!initialLoadComplete || loading) {
    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                 <div className="text-center p-10 text-gray-500">
                    <p>Loading income data...</p>
                 </div>
            </div>
        </Dashboard>
    )
  }

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
            onAddIncome={() => setOpenAddIncomeModal(true)}
            transactions={incomeData}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
            onEmail={handleEmailIncomeDetails}
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

          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Income"
          >
            <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;