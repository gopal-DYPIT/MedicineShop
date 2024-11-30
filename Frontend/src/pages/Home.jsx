import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState("test-user"); // Hardcoded userId for simplicity
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch products from backend
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter the products or fetch based on the search query
    axios
      .get(`http://localhost:5000/api/products?search=${searchQuery}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.error(err));
  };

  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        userId: userId,
        productId: productId,
        quantity: 1,
      });
      alert("Added to Cart!");
    } catch (err) {
      console.log("Failed to add to cart:", err);
    }
  };

  return (
    <div className="mx-32">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-full shadow-md px-4 py-4 mt-8 mb-2 w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 15.232l4.768 4.768M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search your Medicines"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="outline-none font-sans text-gray-700 flex-grow text-lg pl-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 text-lg"
        >
          Search
        </button>
      </form>

      <h1 className="text-center font-lato text-3xl m-10 mb-6">Medicines</h1>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        spaceBetween={5} // Reduced space between cards
        slidesPerView={4} // Reduced the number of cards visible at once
        loop={true}
        className="product-carousel relative px-4 text-sm size-4/5"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="max-w-xs bg-[#f8fff4] rounded-lg overflow-hidden shadow-md pb-8">
              <div>
                <h3 className="font-semibold text-white text-md text-center bg-[#ea6560] w-full mb-4 p-2">
                  {product.name}
                </h3>
                <div className="flex justify-center mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-28 h-28 object-cover rounded-md mx-auto"
                  />
                </div>
                <div className="flex">
                  <p className="text-gray-600 font-semibold text-sm mb-1 ml-2 w-52">
                    {product.description}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold text-sm mb-2 ml-2 w-52">
                    {product.type}
                  </p>
                </div>

                {/* Brand icon left-aligned */}
                <div className="flex justify-start mb-2 ml-1">
                  <img
                    src={product.brand}
                    alt="Brand"
                    className="h-6 object-cover rounded-md"
                  />
                </div>
                <div>
                  <p className="text-[#707a81] font-semibold text-xs mb-2 ml-1">
                    {product.category}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg text-[#62965b] font-bold font-lato ml-2">
                    ₹{product.price}
                  </span>
                  {product.discount && (
                    <span className="text-xs font-semibold text-white bg-[#62965b] px-1 py-1 mr-2 rounded-md">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Centered and properly aligned Add to Cart button */}
                <button
                  onClick={() => addToCart(product._id)}
                  className="mt-2 w-full mx-auto bg-[#ea6560] text-white py-2 px-4 rounded-md hover:bg-red-400"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <div className="swiper-button-next pr-56  pt-48 absolute top-1/2 right-0 transform -translate-y-1/2 z-10 text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="red"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <div className="swiper-button-prev pl-56 pt-48 absolute top-1/2 left-0 transform -translate-y-1/2 z-10 text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Home;
