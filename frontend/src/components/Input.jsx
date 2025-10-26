import { Eye, EyeOff, ChevronDown } from "lucide-react"; // Imported ChevronDown for the select dropdown arrow
import { useState } from "react";

const Input = ({
  label,
  placeholder,
  onChange,
  value,
  type,
  isSelect,
  options,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Helper to determine the input's actual type
  const actualType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  // Common input/select classes for consistency
  const commonInputClasses = "w-full outline-none border border-gray-300 rounded-md text-gray-700 leading-tight focus:outline-none focus:border-blue-500 transition duration-150";

  return (
    <div className="mb-4">
      {/* Label (using consistent styling from previous fix) */}
      <label className="text-sm font-medium text-gray-700 block mb-1">
        {label}
      </label>
      
      <div className="relative">
        {isSelect ? (
          <>
            <select
              value={value}
              onChange={(e) => onChange(e)}
              className={`${commonInputClasses} appearance-none bg-white py-2 px-3 pr-10 cursor-pointer`}
              // Note: The py-2 should make it consistent with the input
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {/* Custom Dropdown Arrow */}
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <ChevronDown size={20} />
            </span>
          </>
        ) : (
          <input
            type={actualType}
            placeholder={placeholder}
            onChange={(e) => onChange(e)}
            value={value}
            className={`${commonInputClasses} bg-transparent py-2 px-3 ${type === "password" ? "pr-10" : ""}`}
          />
        )}
        
        {/* Password Toggle Button */}
        {type === "password" && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <Eye
                size={20}
                className="text-[#363ac8]"
              />
            ) : (
              <EyeOff
                size={20}
                className="text-[#1c208f]"
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;