import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cartImage from '../assets/cart.png';
import icon from '../assets/icon.png';
import { auth, db } from  '../services/firebase'; // You'll need to create this
import { doc, getDoc } from 'firebase/firestore';
import LoginModal from './LoginModel';

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      // Check admin status from Firebase
      if (user) {
        checkAdminRole(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const checkAdminRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      setIsAdmin(userDoc.exists() ? userDoc.data()?.isAdmin || false : false);
    } catch (error) {
      console.error('Error checking admin role:', error);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav className="bg-[#fdf2f2] p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-32 flex justify-between items-center">
        <div className="flex items-center">
          <img src={icon} alt="Icon" className="w-6 h-6" />
          <Link to="/" className="text-black font-roboto font-medium text-lg mr-4 pl-2">
            MedicineShop
          </Link>
        </div>

        <div className="mx-60 flex items-center">
          <Link to="/infoOrder" className="text-black text-base font-lato mx-4 hover:text-blue-600 transition duration-300 ease-in-out">
            How to order medicines
          </Link>
          <Link to="/contact" className="text-black text-base font-lato mx-4 hover:text-blue-600 transition duration-300 ease-in-out">
            Contact us
          </Link>
          
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin-dashboard" className="text-black text-base font-lato mx-4 hover:text-blue-600 transition duration-300 ease-in-out">
                  Admin Dashboard
                </Link>
              )}
              <Link to="/profile" className="text-black text-base font-lato mx-4 hover:text-blue-600 transition duration-300 ease-in-out">
                Profile
              </Link>
              {/* <button
                onClick={handleLogout}
                className="text-black text-base font-lato mx-4 hover:text-blue-600 transition duration-300 ease-in-out"
              >
                Logout
              </button> */}
              <Link to="/cart" className="text-black text-base font-lato mx-4 hover:text-blue-600 transition duration-300 ease-in-out">
                <img src={cartImage} alt="Cart Icon" className="inline-block w-7 h-7" />
              </Link>
            </>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="text-black text-base font-lato mx-4 hover:text-blue-600 transition duration-300 ease-in-out"
            >
              Login
            </button>
          )}
        </div>
      </div>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </nav>
  );
}

export default Navbar;