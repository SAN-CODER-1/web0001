import React, { useState, useEffect } from "react";
import productData from "../data/prod-data.js";
import DishesCard from "../layouts/DishesCard";

const Wishlist = () => {
  const [wishlistTitles, setWishlistTitles] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const titles = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistTitles(titles);
console.log(titles)
    // Filter full product data
    const products = productData.filter((item) => titles.includes(item.title));
    setFilteredProducts(products);
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
      {filteredProducts.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredProducts.map((item, i) => (
            
              <DishesCard
            key={i}
            img={item.img}
            title={item.title}
            price={`Rs. ${item.price}`}
          />
           
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
