import React, { useEffect, useState } from "react";

const Oderslist = () => {
  const [orders, setOrders] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
 const API_URI = import.meta.env.VITE_API_URI;
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URI}/api/orders`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Unable to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URI}/api/orders/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete order");

      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete order");
    }
  };

  const handleStatusUpdate = async (orderId, currentStatus) => {
    if (currentStatus === "Finished") return alert("Already marked as Finished");

    try {
      const response = await fetch(`${API_URI}/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Finished" }),
      });

      if (!response.ok) throw new Error("Failed to update order");

      const data = await response.json();

      setOrders(orders.map((order) =>
        order._id === orderId ? data.order : order
      ));
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update order status");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        🛒 Admin Dashboard – Orders Overview
      </h1>

      {errorMsg ? (
        <div className="text-center text-red-600">{errorMsg}</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-600">No orders found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Items</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{order.customerName}</td>
                  <td className="py-2 px-4">{order.items.join(", ")}</td>
                  <td className="py-2 px-4">₹{order.totalAmount}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-white ${order.status === "Finished" ? "bg-green-600" : "bg-yellow-600"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {new Date(order.date).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate(order._id, order.status)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Mark Finished
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};




export default Oderslist;
