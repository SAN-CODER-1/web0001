import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productData from "../data/prod-data.js";

const Placeorder = () => {
  const { title } = useParams();
  const product = productData.find((item) => item.title === title);
  const [customerName, setCustomerName] = useState("");
  const [confirmationMsg, setConfirmationMsg] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Spinner state
  const navigate = useNavigate();
  const API_URI = import.meta.env.VITE_API_URI;

  const handleOrder = async () => {
    if (!customerName) {
      setConfirmationMsg("⚠️ Please enter your name.");
      return;
    }

    const order = {
      customerName,
      items: [product.title],
      totalAmount: product.price,
    };

    try {
      setLoading(true); // ✅ Start loading
      const response = await fetch(`${API_URI}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
        mode: "cors",
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("❌ Failed response:", response.status, text);
        setConfirmationMsg(`❌ Order failed: ${response.statusText}`);
      } else {
        const data = await response.json();
        console.log("✅ Order success:", data);
        navigate("/order-success", { state: { order: data.order } });
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error.message);
      setConfirmationMsg("❌ Error connecting to server.");
    } finally {
      setLoading(false); // ✅ End loading
    }
  };

  if (!product) {
    return (
      <div className="text-center mt-20 text-xl text-red-600">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <img
        src={product.img}
        className="w-80 mt-16 rounded-lg mb-6 shadow-lg"
        alt={product.title}
      />
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-xl text-gray-700 mb-4">Price: ₹{product.price}</p>
      <input
        type="text"
        placeholder="Your Name"
        className="px-4 py-2 border rounded mb-4 w-72"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <button
        className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
        onClick={handleOrder}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Confirm Booking"}
      </button>

      {loading && (
        <div className="mt-4">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {confirmationMsg && (
        <div className="mt-4 text-lg text-blue-700 font-medium">
          {confirmationMsg}
        </div>
      )}
    </div>
  );
};

export default Placeorder;
