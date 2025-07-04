import React, { useState } from "react";
import DishesCard from "../layouts/DishesCard";
import productData from "../data/prod-data";


const Products = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [category, setCategory] = useState("All");

  // Filter + Sort logic
  const filteredProducts = productData
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      category === "All" ? true : item.category === category
    )
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col items-center lg:px-32 px-5 py-10">
      <h1 className="text-4xl font-semibold text-center pt-24 pb-10">
        Our Dishes
      </h1>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-10 w-full justify-center items-center">
        <input
          type="text"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full max-w-sm"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md"
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md"
        >
          <option value="All">All Categories</option>
          <option value="Rice">Rice</option>
          <option value="Noodles">Noodles</option>
          <option value="Starter">Starter</option>
        </select>
      </div>

      {/* Dish Cards */}
      <div className="flex flex-wrap gap-8 justify-center">
        {filteredProducts.map((item, index) => (
          <DishesCard
            key={index}
            img={item.img}
            title={item.title}
            price={`Rs. ${item.price}`}
          />
        ))}

        {filteredProducts.length === 0 && (
          <p className="text-gray-500 mt-10">No dishes match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
