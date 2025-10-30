// src/components/AddExpenseForm.jsx

import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    category: "",
    categoryId: "",
    icon: "",
  });

  const [loading, setLoading] = useState(false);

  const categoryOptions = [
    {
      value: "",
      label: "Select Category (Required)",
      disabled: true,
      isHidden: true,
    },
    ...categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  const handleAddExpense = async () => {
    setLoading(true);
    try {
      await onAddExpense(expense);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !expense.categoryId) {
      setExpense((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, expense.categoryId]);

  return (
    <div className="">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Expense Name"
        placeholder="e.g., Groceries, Rent, Utilities"
        type="text"
      />

      <Input
        label="Category"
        isSelect={true}
        options={categoryOptions}
        value={expense.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="e.g., 300.00"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          disabled={loading}
          onClick={handleAddExpense}
          className="add-btn add-btn-fill flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="mr-1">Adding...</span>
              <LoaderCircle className="w-5 h-5 animate-spin" />
            </>
          ) : (
            <>Add Expense</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;