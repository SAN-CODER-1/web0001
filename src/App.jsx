import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Dishes from "./components/Dishes";
import Review from "./components/Review";
import Products from "./components/products";
import ProductDetails from "./components/productdetial";
import Wishlist from "./components/whishlist";
import Placeorder from "./components/placeorder";
import OrderSuccess from "./components/odersucces";
import Oderslist from "./components/admin/oderslist";
import AdminOffers from "./components/admin/offadmin";
import OfferBannerSection from "./components/offbanner";
// Make sure this exists

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Product routing pages */}
        <Route path="/" element={<MainSections />} />
        <Route path="/foods" element={ <Products />} />
        <Route path="/whishlist" element={ <Wishlist/>} />
        <Route path="/product/:title" element={<ProductDetails/>} />
        <Route path="/confirmorder/:title" element={<Placeorder/>} />
         <Route path="/order-success" element={<OrderSuccess />} />

         {/* {admin contents} */}
         <Route path="/orderlist" element={<Oderslist />} />
         <Route path="/adminoffer" element={<AdminOffers/>} />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

// All sections inside /
const MainSections = () => {
  return (
    <main>
      <div id="home">
        <Home />
        <OfferBannerSection/>
      </div>
      <div id="dishes">
        <Dishes />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="menu">
        <Menu />
      </div>
      <div id="review">
        <Review />
      </div>
    </main>
  );
};

export default App;
