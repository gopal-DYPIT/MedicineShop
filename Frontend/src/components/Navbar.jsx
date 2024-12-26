import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartImage from "../assets/cart.png";
// import icon from "../assets/icon.png";
import companyicon from "../assets/company.png";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import LoginModal from "./LoginModel";
import axios from "axios";

function Navbar({ onSearch }) {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        checkAdminRole(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const checkAdminRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      setIsAdmin(userDoc.exists() ? userDoc.data()?.isAdmin || false : false);
    } catch (error) {
      console.error("Error checking admin role:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Search initiated with query:", searchQuery);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/products?search=${searchQuery}`
      );
      console.log("Search results:", response.data);
      onSearch(response.data);
      navigate("/");
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav className="bg-[#c8f4df] p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={companyicon} alt="Icon" className="w-6 h-6" />
            <Link
              to="/"
              className="text-black font-roboto font-medium text-lg mr-4 pl-2"
            >
              Meds4You
            </Link>
          </div>

          <div className="flex-1 ml-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search your Medicines"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-3 py-1 rounded-l-full border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-[#4a8694] text-white px-3 py-1 rounded-r-full hover:bg-[#225f6a] transition duration-300"
              >
                Search
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              to="/infoOrder"
              className="text-black text-base font-lato hover:text-blue-600 transition duration-300 ease-in-out"
            >
              How to order
            </Link>
            <Link
              to="/contact"
              className="text-black text-base font-lato hover:text-blue-600 transition duration-300 ease-in-out"
            >
              Contact
            </Link>

            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin-dashboard"
                    className="text-black text-base font-lato hover:text-blue-600 transition duration-300 ease-in-out"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-black text-base font-lato hover:text-blue-600 transition duration-300 ease-in-out"
                >
                  Profile
                </Link>
                <Link
                  to="/cart"
                  className="text-black text-base font-lato hover:text-blue-600 transition duration-300 ease-in-out"
                >
                  <div className="w-6 h-6 bg-white rounded-full flex justify-center items-center shadow-md transform hover:scale-110 transition-transform duration-300 ease-in-out">
                    <img className="w-4 h-4" src={cartImage} alt="Cart" />
                  </div>
                </Link>
              </>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="text-black text-base font-lato hover:text-blue-600 transition duration-300 ease-in-out"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </nav>
  );
}

export default Navbar;
