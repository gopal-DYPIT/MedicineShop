import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Fetch products and orders from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await axios.get("/api/admin/products");
        const orderData = await axios.get("/api/admin/orders");

        console.log("Fetched Products:", productData.data);
        console.log("Fetched Orders:", orderData.data);

        setProducts(Array.isArray(productData.data) ? productData.data : []);
        setOrders(Array.isArray(orderData.data) ? orderData.data : []);
        setLoadingProducts(false);
        setLoadingOrders(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingProducts(false);
        setLoadingOrders(false);
      }
    };
    fetchData();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/admin/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateOrderStatus = async (orderId, status, paymentStatus) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}/status`, { orderStatus: status, paymentStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: status, paymentStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`/api/admin/orders/${id}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Show loading states for specific sections
  if (loadingProducts && loadingOrders) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Product Management */}
        <div>
          <h2 className="text-xl font-semibold">Manage Products</h2>
          {loadingProducts ? (
            <div>Loading products...</div>
          ) : products.length === 0 ? (
            <div>No products available</div>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product._id} className="flex justify-between items-center p-2 border-b">
                  <span>{product.name}</span>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Order Management */}
        <div>
          <h2 className="text-xl font-semibold">Manage Orders</h2>
          {loadingOrders ? (
            <div>Loading orders...</div>
          ) : orders.length === 0 ? (
            <div>No orders available</div>
          ) : (
            <ul>
              {orders.map((order) => (
                <li key={order._id} className="flex flex-col p-2 border-b">
                  <div className="flex justify-between items-center">
                    <span>Order ID: {order._id}</span>
                    <span>Status: {order.orderStatus}</span>
                    <span>Payment: {order.paymentStatus}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => updateOrderStatus(order._id, "Completed", "Paid")}
                      className="text-blue-500"
                    >
                      Mark as Completed
                    </button>
                    {order.paymentStatus === "Paid" && (
                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="text-red-500"
                      >
                        Remove Order
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
