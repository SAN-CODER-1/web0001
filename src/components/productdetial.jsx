import React from "react";
import { useParams } from "react-router-dom";
import productData from "../data/prod-data.js"; // assuming you export the 30 products here
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { title } = useParams();
  const product = productData.find((item) => item.title === title);

  if (!product) {
    return <div className="text-center mt-20 text-xl">Product not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 ">
      <img src= {`.${product.img}`} className="w-80 mt-16 rounded-lg mb-6 shadow-lg" />
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-xl text-gray-700 mb-4">Price: Rs. {product.price}</p>
      <p className="text-gray-600 max-w-xl text-center mb-6">
        {product.description || "This dish is a delicious blend of spices and flavors, crafted with care to give you an unforgettable experience."}
      </p>
      
      
         <Link
            to={`/confirmorder/${title}`}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Book Now
          </Link>
      
    </div>
  );
};

export default ProductDetails;
