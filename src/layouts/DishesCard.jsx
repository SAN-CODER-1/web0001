import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DishesCard = ({ img, title, price }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(wishlist.includes(title));
  }, [title]);

  const handleAddToWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.includes(title)) {
      wishlist.push(title);
      setNotificationText("❤️ Added to Wishlist!");
      setIsWishlisted(true);
    } else {
      wishlist = wishlist.filter((item) => item !== title);
      setNotificationText("💔 Removed from Wishlist!");
      setIsWishlisted(false);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    triggerNotification();
  };

  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <>
      <div className="relative p-4 border rounded shadow text-center bg-white transition hover:shadow-lg">
        <img src={img} alt={title} className="w-full h-40 object-cover rounded" />
        <h3 className="font-bold text-xl mt-2">{title}</h3>
        <p className="text-gray-600">Rs. {price}</p>

        {/* Book Now + Wishlist icon in one row */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <Link
            to={`/product/${title}`}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Book Now
          </Link>

          <span
            className="material-symbols-outlined text-3xl cursor-pointer hover:scale-110 transition-transform"
            style={{
              fontVariationSettings: `"FILL" ${isWishlisted ? 1 : 0}, "wght" 400, "GRAD" 0, "opsz" 48`,
              color: isWishlisted ? "red" : "gray",
            }}
            onClick={handleAddToWishlist}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            favorite
          </span>
        </div>
      </div>

      {/* Notification in top right */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow-lg text-sm font-medium animate-fadeIn z-50">
          {notificationText}
        </div>
      )}
    </>
  );
};

export default DishesCard;
