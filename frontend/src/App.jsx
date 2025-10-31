import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Filter from "./pages/Filter";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";

// New page imports
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";


const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          
          {/* Public Pages */}
          <Route path="/home" element={<LandingPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/category" element={<Category />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  // If authenticated, redirect to the dashboard.
  // If not, redirect to the new public landing page.
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/home" />
  );
};

export default App;