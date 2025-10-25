import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import axiosConfig from "../utils/axiosConfig";
import toast from "react-hot-toast";

const Category = () => {
  useUser();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      
      setCategoryData(response.data); 
    } catch (error) {
      console.error("Error fetching categories:", error);
      const errorMessage = error.response?.data?.message || "Error fetching categories";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(); 
  }, [])

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/* Add button to add category */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button 
          className="add-btn flex items-center gap-1">
            <Plus size={15}/>
            Add Category
          </button>
        </div>

        {/* Category list */}
        <CategoryList categories={categoryData} />

        {/* Adding category modal */}

        {/* Updating category modal */}
      </div>
    </Dashboard>
  );
};

export default Category;