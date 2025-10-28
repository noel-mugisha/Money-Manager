import { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, isEditing, initialCategoryData }) => {
  const [category, setCategory] = useState({
    name: "",
    icon: "",
    type: "income",
  });

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({
        name: "",
        icon: "",
        type: "income",
      });
    }
  }, [isEditing, initialCategoryData]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAddCategory(category);
    } catch (error) {
      console.error("Add category submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Category Name"
        placeholder="e.g: Salary, Freelance, Groceries, etc.."
        type="text"
      />

      <Input
        label="Category Type"
        isSelect={true}
        options={categoryTypeOptions}
        value={category.type}
        onChange={({ target }) => handleChange("type", target.value)}
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          disabled={loading}
          className={`add-btn add-btn-fill flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <span className="mr-1">
                {isEditing ? "Updating..." : "Adding..."}
              </span>
              <LoaderCircle className="w-5 h-5 animate-spin" />
            </>
          ) : (
            <span>{isEditing ? "Update Category" : "Add Category"}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
