// src/pages/OrderSuccess.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        No order found. Please try again.
        <button
          className="block mx-auto mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold text-green-700 mb-4">✅ Order Placed Successfully!</h1>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <p className="text-lg"><strong>Order ID:</strong> {order._id}</p>
        <p className="text-lg"><strong>Customer:</strong> {order.customerName}</p>
        <p className="text-lg"><strong>Status:</strong> {order.status}</p>
        <p className="text-lg"><strong>Total:</strong> ₹{order.totalAmount}</p>
        <p className="text-lg"><strong>Items:</strong> {order.items.join(", ")}</p>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Placed At:</strong> {new Date(order.date).toLocaleString()}
        </p>

        <button
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => navigate("/")}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
