import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({ label, placeholder, onChange, value, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label className="text-[13px] text-slate-800 block mb-1">{label}</label>
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          value={value}
          className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        />
        {type === "password" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ">
            {showPassword ? (
              <Eye
                size={20}
                className="text-[#363ac8]"
                onClick={toggleShowPassword}
              />
            ) : (
              <EyeOff
                size={20}
                className="text-[#1c208f]"
                onClick={toggleShowPassword}
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
