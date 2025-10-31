import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={assets.logo} alt="Money Manager Logo" className="h-8 w-8" />
            <span className="text-lg font-semibold text-gray-800">Money Manager</span>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-6 text-gray-600">
            <Link to="/about-us" className="hover:text-purple-700">About</Link>
            <Link to="/contact-us" className="hover:text-purple-700">Contact</Link>
            <Link to="/login" className="hover:text-purple-700">Login</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          &copy; {currentYear} Money Manager. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;