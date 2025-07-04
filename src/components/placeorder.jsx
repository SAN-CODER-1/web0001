import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 👈 added useNavigate
import productData from "../data/prod-data.js";

const Placeorder = () => {
  const { title } = useParams();
  const product = productData.find((item) => item.title === title);
  const [customerName, setCustomerName] = useState("");
  const [confirmationMsg, setConfirmationMsg] = useState("");
  const navigate = useNavigate(); // 👈

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
      const response = await fetch("http://localhost:5000/api/orders", {
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

        // ✅ Redirect to OrderSuccess page with order data
        navigate("/order-success", { state: { order: data.order } });
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error.message);
      setConfirmationMsg("❌ Error connecting to server.");
    }
  };

  if (!product) {
    return <div className="text-center mt-20 text-xl">Product not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      {/* Product details */}
      <img src={`.${product.img}`} className="w-80 mt-16 rounded-lg mb-6 shadow-lg" alt={product.title} />
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-xl text-gray-700 mb-4">Price: Rs. {product.price}</p>
      <input
        type="text"
        placeholder="Your Name"
        className="px-4 py-2 border rounded mb-4 w-72"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        onClick={handleOrder}
      >
        Confirm Booking
      </button>

      {confirmationMsg && (
        <div className="mt-4 text-lg text-blue-700 font-medium">
          {confirmationMsg}
        </div>
      )}
    </div>
  );
};

export default Placeorder;
