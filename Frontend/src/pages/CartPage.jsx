import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth0(); // Get user details from Auth0
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart data only if the user is authenticated
    if (isAuthenticated && user?.sub) {
      const userId = user.sub; // Auth0 provides a unique ID as `sub`
      axios
        .get(`http://localhost:5000/api/cart/${userId}`)
        .then((response) => {
          setCart(response.data?.items || []);
        })
        .catch((err) => {
          setError("Failed to fetch cart");
          console.error("Failed to fetch cart:", err);
        });
    }
  }, [isAuthenticated, user]);

  const handleDelete = (productId) => {
    if (isAuthenticated && user?.sub) {
      const userId = user.sub;
      axios
        .delete(`http://localhost:5000/api/cart/remove`, { data: { userId, productId } })
        .then(() => {
          setCart(cart.filter((item) => item.productId._id !== productId));
        })
        .catch((err) => {
          setError("Failed to delete item");
          console.error("Failed to delete item:", err);
        });
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1 || !isAuthenticated || !user?.sub) return;

    const userId = user.sub;
    axios
      .put(`http://localhost:5000/api/cart/update`, { userId, productId, quantity })
      .then(() => {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.productId._id === productId ? { ...item, quantity } : item
          )
        );
      })
      .catch((err) => {
        setError("Failed to update quantity");
        console.error("Failed to update quantity:", err);
      });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto p-24">
      <h1 className="text-center text-3xl mb-6">Your Cart</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center border p-4 rounded-md">
              <img
                src={item?.productId?.image || "placeholder.jpg"}
                alt={item?.productId?.name || "Unnamed product"}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <h2 className="font-bold text-lg">{item?.productId?.name || "Unknown Product"}</h2>
                <p className="text-blue-600 font-semibold">
                  Price: Rs.{item?.productId?.price || "N/A"}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.productId._id, item.quantity - 1)
                    }
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="px-4">{item?.quantity || 0}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.productId._id, item.quantity + 1)
                    }
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleDelete(item.productId._id)}
                className="ml-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <button
          onClick={handleCheckout}
          className="bg-green-500 text-white p-2 rounded mt-6 block mx-auto transition transform duration-300 ease-in-out hover:bg-green-600 hover:scale-105"
        >
          Checkout
        </button>
      )}
    </div>
  );
};

export default CartPage;
