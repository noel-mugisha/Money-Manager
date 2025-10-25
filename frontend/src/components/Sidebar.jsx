// src/components/Sidebar.jsx

import { useContext } from "react";
import AppContext from "../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({activeMenu}) => {
  const { user } = useContext(AppContext) || { user: {} }; 
  const navigate = useNavigate();

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 rounded-full bg-slate-400"
          />
        ) : (
          <User className="w-20 h-20 text-xl" />
        )}
        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_BAR_DATA.map((item, index) => {
        const isActive = activeMenu === item.label;

        // Conditional classes for hover effect and active state
        const buttonClasses = `
          cursor-pointer 
          w-full 
          flex 
          items-center 
          gap-4 
          text-[15px] 
          py-3 
          px-6 
          rounded-lg 
          mb-3 
          ${isActive 
            ? "text-white bg-purple-800" // Active state classes
            : "text-gray-900 hover:bg-gray-100" // Inactive state classes with hover
          }
        `;

        return (
          <button
            onClick={() => navigate(item.path)}
            key={`menu_${index}`}
            className={buttonClasses.trim()}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        )
      })}
    </div>
  );
};

export default Sidebar;