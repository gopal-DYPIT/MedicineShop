import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import ContactUs from "./pages/Contact";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";  // Import PrivateRoute component
import OrderMedicine from "./components/OrderMedicine";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Use PrivateRoute to protect routes */}
        <Route
          path="/cart"
          element={<PrivateRoute element={CartPage} />}
        />
        <Route
          path="/checkout"
          element={<PrivateRoute element={CheckoutPage} />}
        />
        <Route
          path="/admin"
          element={<PrivateRoute element={AdminDashboard} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={Profile} />}
        />
        <Route
          path="/infoOrder"
          element={<PrivateRoute element={OrderMedicine} />}
        />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
