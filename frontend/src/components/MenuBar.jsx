import { useContext, useRef, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import { assets } from "../assets/assets";

const MenuBar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef(null);
  const { user } = useContext(AppContext) || { user: {} }; 
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
      {/* Left Section */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
        >
          {openSideMenu ? (
            <X className="text-2xl" />
          ) : (
            <Menu className="text-2xl" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-10 w-10" />
          <span className="text-lg font-medium text-black truncate">
            Money Manager
          </span>
        </div>
      </div>

      {/* Right Section - Profile photo */}
      <div className="relative" ref={dropDownRef}>
        <button
          onClick={() => setShowDropDown(!showDropDown)}
          className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-300 rounded-full transition-colors duration-200 focus:ring-2 focus:ring-purple-800 focus:ring-offset-2"
        >

          <User className="text-gray-600" />
        </button>

        {/* Dropdown Menu */}
        {showDropDown && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"> 

            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">

                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="text-gray-600 w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                      {user?.fullName || 'Guest User'} 
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                      {user?.email || 'N/A'} 
                  </p>
                </div>
              </div>
            </div>

            {/* Drop Down options */}
            <div className="py-1"></div>
          </div>
        )}
      </div>

      {/* Mobile side menu */}
    </div>
  );
};

export default MenuBar;