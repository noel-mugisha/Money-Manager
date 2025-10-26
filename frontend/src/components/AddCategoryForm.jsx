import { useState } from "react";
import Input from "./Input";

const AddCategoryForm = () => {
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
    setCategory({...category, [key]: value});
  }

  return (
    <div className="p-4 space-y-4">
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
    </div>
  );
};

export default AddCategoryForm;
