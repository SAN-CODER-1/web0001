import React from "react";

const OfferCard = ({ title, oldPrice, newPrice, img, expiresAt }) => {
  const formattedDate = new Date(expiresAt).toLocaleDateString();

  return (
    <div className="p-4 border rounded-lg bg-yellow-50 shadow hover:shadow-lg transition">
      <img src={img} alt={title} className="h-40 w-full object-cover rounded" />
      <h2 className="text-xl font-bold mt-2 text-red-600">{title}</h2>
      <p className="text-gray-700 line-through">Rs. {oldPrice}</p>
      <p className="text-green-600 text-lg font-semibold">Now: Rs. {newPrice}</p>
      <p className="text-sm text-gray-500 mt-1">Valid until: {formattedDate}</p>
    </div>
  );
};

export default OfferCard;
