import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import LoginModal from "../components/LoginModel";
import HomeAdvantageSection from "../components/HomeDetailsSection";
import MedicineCarousel from "../components/MedicineCarousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        checkAdminRole(user.uid);
      }
    });

    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.error(err));

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

  const addToCart = async (productId) => {
    if (!user) {
      setShowLoginModal(true);
      toast.info("Please log in to add items to your cart.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        userId: user.uid,
        productId: productId,
        quantity: 1,
      });

      toast.success("Added to Cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      console.log("Failed to add to cart:", err);

      toast.error("Failed to Add to Cart. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };  

  return (
    <div className="mx-auto max-w-7xl mt-20">
      {/* Header Section */}
      <div className="header-section text-center bg-blue-100 py-16">
        <h1 className="text-4xl font-bold text-[#333333] mb-4">
          Your Partner in Affordable Healthcare
        </h1>
        <div className="space-x-4">
          <Link to="/products" className="hover:underline">
          <button className="bg-[#d1f3e0] text-[#444444]  px-6 py-2 rounded-full hover:bg-[#4CAF50]">
            Browse Medicines
          </button>
          </Link>
          <Link to="/infoOrder">
          <button className="bg-[#d1f3e0] text-[#444444] px-6 py-2 rounded-full hover:bg-[#4CAF50]">
            Upload Prescription
          </button>
          </Link>
          <Link to="/join-partner">
          <button className="bg-[#d1f3e0] text-[#444444] px-6 py-2 rounded-full hover:bg-[#4CAF50]">
            Join as Store Partner
          </button>
          </Link>

          {/* <button className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600">
            Learn More
          </button> */}
        </div>
      </div>

      <div className="px-8 mt-8">
        <MedicineCarousel products={products} addToCart={addToCart} />
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-us bg-gray-100 py-12">
        <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us?</h2>
        <ul className="list-none text-center">
          <li>Save up to 30% with high-quality generic alternatives.</li>
          <li>Easy prescription upload and alternative suggestions.</li>
          <li>Dedicated to making healthcare accessible to all.</li>
        </ul>
      </div>

      {/* Highlighted Categories */}
      <div className="categories-section text-center py-12">
        <h2 className="text-2xl font-bold mb-6">Highlighted Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>Heart Health</div>
          <div>Diabetes Management</div>
          <div>Pain Relief</div>
          <div>Vitamins & Supplements</div>
        </div>
      </div>

      {/* Featured Savings */}
      <div className="featured-savings text-center bg-blue-50 py-12">
        <h2 className="text-2xl font-bold mb-6">Featured Savings</h2>
        <p>Switch to generic medicines and save big!</p>
        <p>Upload your prescription now and discover affordable options.</p>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section bg-gray-200 py-12">
        <h2 className="text-2xl font-bold text-center mb-6">Testimonials</h2>
        <p>"Meds4You helped me save thousands on my monthly medicine bills!" - Amit K.</p>
        <p>"Quality medicines at unbeatable prices. Highly recommend!" - Preeti S.</p>
      </div>

      {/* Admin Section */}
      {isAdmin && (
        <div className="text-center mt-10">
          <button className="bg-green-500 text-white px-6 py-2 rounded-full">
            Admin Dashboard
          </button>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <LoginModal onClose={() => setShowLoginModal(false)} />
        </div>
      )}

      {/* Toastify Container */}
      <ToastContainer />
    </div>
  );
};

export default Home;