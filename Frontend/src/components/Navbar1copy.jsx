import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cartImage from "../assets/cart.png";
import icon from "../assets/icon.png";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { user, loginWithPopup, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!isAuthenticated || !user) return;

      try {
        const token = await getAccessTokenSilently();
        const userRoles = user?.["https://dev-nu5x8yo5712d4hqt.us.auth0.com/roles"] || [];
        setIsAdmin(userRoles.includes("admin"));
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    checkAdminRole();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    <nav className="bg-[#fdf2f2] p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-32 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo */}
          <img src={icon} alt="Icon" className="w-6 h-6" />
          <Link
            to="/"
            className="text-black font-roboto font-medium text-lg mr-4 pl-2"
          >
            MedicineShop
          </Link>
        </div>

        {/* Links */}
        <div className="mx-60 flex items-center">
          <Link
            to="/infoOrder"
            className="text-black text-base font-lato mx-4 hover:text-blue-600 transition duration-300 ease-in-out"
          >
            How to order medicines
          </Link>
          <Link
            to="/contact"
            className="text-black text-base font-lato mx-4 hover:text-blue-600 transition duration-300 ease-in-out"
          >
            Contact us
          </Link>
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin-dashboard"
                  className="text-black text-base font-lato mx-4 hover:text-blue-600 transition duration-300 ease-in-out"
                >
                  Admin Dashboard
                </Link>
              )}
              {/* Profile Button */}
              <Link
                to="/profile"
                className="text-black text-base font-lato mx-4 hover:text-blue-600 transition duration-300 ease-in-out"
              >
                Profile
              </Link>
              {/* Logout Button */}
              {/* <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="text-black text-base font-lato mx-4 hover:text-blue-600 transition duration-300 ease-in-out"
              >
                Logout
              </button> */}
              {/* Cart Icon */}
              <Link
                to="/cart"
                className="text-black text-base font-lato mx-4 hover:text-blue-600 transition duration-300 ease-in-out"
              >
                <img src={cartImage} alt="Cart Icon" className="inline-block w-7 h-7" />
              </Link>
            </>
          ) : (
            /* Login Button */
            <button
              onClick={loginWithPopup}
              className="text-black text-base font-lato mx-4 hover:text-blue-600 transition duration-300 ease-in-out"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
