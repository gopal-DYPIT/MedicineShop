import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 pl-28 border-t border-gray-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
        {/* Left Section - Logo and Apps */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">MedicineShop</h1>
            <p className="text-gray-600 text-sm">
              Afforis Health Technologies Pvt. Ltd.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Apple_App_Store_%28iOS%29_logo.svg"
              alt="App Store"
              className="h-10 w-36"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play Store"
              className="h-10 w-36"
            />
          </div>
        </div>

        {/* Middle Section - Company Links */}
        <div className="ml-10">
          <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Best Online Pharmacy in Bangalore, India
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Buy Medicines Online With Discount
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Terms of Use
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="ml-32">
          <h3 className="font-semibold text-gray-800 mb-4">Contact Us</h3>
          <p className="text-gray-600 text-sm">care@medicineShop.in</p>
          <p className="text-gray-600 text-sm">+91 0089099</p>
        </div>

        {/* Social Media Section */}
        <div  className="ml-24">
          <h3 className="font-semibold text-gray-800 mb-4">Follow us on</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-red-500 hover:text-red-700">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="#" className="text-red-500 hover:text-red-700">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
            <a href="#" className="text-red-500 hover:text-red-700">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a href="#" className="text-red-500 hover:text-red-700">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
