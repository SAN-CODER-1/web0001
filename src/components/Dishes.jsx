import React from "react";
import DishesCard from "../layouts/DishesCard";

const product = [
  { img: "./img/img4.jpg", title: "Egg Noodles", category: "Noodles", price: 780 },
  { img: "./img/img5.jpg", title: "Singapore Noodles", category: "Noodles", price: 920 },
  { img: "./img/img6.jpg", title: "Hakka Noodles", category: "Noodles", price: 860 },
];

const Dishes = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
      <h1 className="text-4xl font-semibold text-center pt-24 pb-10">
        Our Dishes
      </h1>

      {/* Fixing layout: all cards in one flex container */}
      <div className="flex flex-wrap gap-8 justify-center">
        {product.map((item, index) => (
          <DishesCard
            key={index}
            img={item.img}
            title={item.title}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Dishes;
