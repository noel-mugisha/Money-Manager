import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import axiosConfig from "../utils/axiosConfig";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm"; 

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
      const errorMessage =
        error.response?.data?.message || "Error fetching categories";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name,
        type,
        icon,
      });
      if (response.status === 201) {
        toast.success("Category added successfully");
        setOpenAddCategoryModal(false);
        fetchCategories();
      }
    } catch (error) {
      console.error("Error adding category:", error);
      const errorMessage =
        error.response?.data?.message || "Error adding category";
      toast.error(errorMessage);
      throw error;
    }
  };

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModal(true);
  };

  const handleUpdateCategory = async(updatedCategory) => {
    const {id, name, type, icon} = updatedCategory;
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!id) {
      toast.error("Category ID is required");
      return;
    }

    try {
      const response = await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {
        name,
        type,
        icon,
      })

      if (response.status === 200) {
        toast.success("Category updated successfully");
        setSelectedCategory(null);
        setOpenEditCategoryModal(false);
        fetchCategories();
      }
    } catch (error) {
      console.error("Error updating category:", error);
      const errorMessage =
        error.response?.data?.message || "Error updating category";
      toast.error(errorMessage);
      throw error;
    }
  }

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/* Add button to add category */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="add-btn flex items-center gap-1"
          >
            <Plus size={15} />
            Add Category
          </button>
        </div>

        {/* Category list */}
        <CategoryList
          categories={categoryData}
          onEditCategory={handleEditCategory}
        />

        {/* Adding category modal */}
        <Modal
          isOpen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
          title="Add Category"
        >
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </Modal>

        {/* Updating category modal */}
        <Modal
          isOpen={openEditCategoryModal}
          onClose={() => {
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
          }}
          title="Update Category"
        >
          <AddCategoryForm 
          initialCategoryData={selectedCategory}
          onAddCategory={handleUpdateCategory}
          isEditing = {true}
          />
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Category;
