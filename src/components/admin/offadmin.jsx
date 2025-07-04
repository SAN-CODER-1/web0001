import React, { useState, useEffect } from "react";

const AdminOffers = () => {
  const [form, setForm] = useState({
    productId: "",
    discountPercent: "",
    oldPrice: "",
    image: "",
    expiresAt: "",
  });
  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    const res = await fetch("http://localhost:5000/api/offers");
    const data = await res.json();
    setOffers(data);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    alert("Offer added!");
    setForm({ productId: "", discountPercent: "", oldPrice: "", image: "", expiresAt: "" });
    fetchOffers();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/offers/${id}`, {
      method: "DELETE",
    });
    fetchOffers();
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">🛠️ Manage Offers</h2>
      <form className="grid gap-4 mb-6" onSubmit={handleSubmit}>
        <input
          className="border p-2"
          placeholder="Product ID"
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Old Price"
          value={form.oldPrice}
          onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Discount %"
          value={form.discountPercent}
          onChange={(e) => setForm({ ...form, discountPercent: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <input
          className="border p-2"
          type="date"
          placeholder="Expiry Date"
          value={form.expiresAt}
          onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Offer</button>
      </form>

      <div>
        {offers.map((offer) => (
          <div key={offer._id} className="mb-4 p-4 border rounded flex justify-between">
            <div>
              <strong>{offer.productId?.title}</strong> – {offer.discountPercent}% off (₹{offer.oldPrice} → ₹{offer.newPrice})
            </div>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(offer._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOffers;
