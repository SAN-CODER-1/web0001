import React, { useEffect, useState } from "react";
import OfferCard from "../layouts/offercard.jsx";

const OfferBannerSection = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/offers");
        const data = await res.json();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  if (offers.length === 0) return null; // 🔒 Return nothing if no offers

  return (
    <section className="py-10 px-4 bg-gradient-to-r from-yellow-100 to-pink-100">
      <h1 className="text-3xl font-bold text-center mb-8">🔥 Limited Time Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {offers.map((offer) => (
          <OfferCard
            key={offer._id}
            title={offer.productId.title}
            oldPrice={offer.oldPrice}
            newPrice={offer.newPrice}
            img={offer.image}
            expiresAt={offer.expiresAt}
          />
        ))}
      </div>
    </section>
  );
};

export default OfferBannerSection;
