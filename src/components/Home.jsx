import React from "react";
import Button from "../layouts/Button";
import { Link,Navigate } from "react-router-dom";

const Home = () => {
  const handleclick=()=>{
    Navigate('/foods')
  }
  return (
    <div className=" min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 bg-[url('./assets/img/backfood.jpg')] bg-cover bg-no-repeat ">
      <div className=" w-full lg:w-2/3 space-y-5">
        <h1 className=" text-backgroundColor font-semibold text-6xl">
          Awaken Your Taste Buds—Every Bite Is a Celebration.


        </h1>
        <p className=" text-backgroundColor">
         Enjoy food that’s full of flavor, made with love, and meant to make you smile.
          Every dish is fresh, tasty, and cooked to make your day better.
           It’s not just a meal—it’s a moment to enjoy.


        </p>
        <div  className=" lg:pl-44">
          <Link to={"/foods"}><Button title="Click. Eat. Repeat" /></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
