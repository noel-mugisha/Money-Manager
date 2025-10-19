import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Filter from "./pages/Filter";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/category" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
