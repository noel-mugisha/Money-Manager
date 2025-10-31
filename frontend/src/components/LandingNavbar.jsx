import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets";

const LandingNavbar = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/home" className="flex items-center gap-2">
          <img src={assets.logo} alt="Money Manager Logo" className="h-10 w-10" />
          <span className="text-xl font-semibold text-gray-800">Money Manager</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/home" className="text-gray-600 hover:text-purple-700 transition-colors">Home</Link>
          <Link to="/about-us" className="text-gray-600 hover:text-purple-700 transition-colors">About Us</Link>
          <Link to="/contact-us" className="text-gray-600 hover:text-purple-700 transition-colors">Contact us</Link>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="font-medium hover:text-purple-800 transition-colors cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-2 bg-purple-900 text-white font-medium rounded-lg shadow-md hover:bg-purple-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
};
export default LandingNavbar;