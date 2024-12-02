import React from "react";

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 py-10 mt-14">
      <h1 className="text-3xl font-bold text-gray-700 mb-5">
        We Deliver Happiness! ❤️
      </h1>
      <div className="flex flex-wrap bg-white shadow-lg rounded-lg overflow-hidden w-11/12 md:w-3/4 lg:w-2/3">
        {/* Contact Information */}
        <div className="w-full md:w-1/2 bg-red-400 text-white p-8">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <p className="mb-2">
            📞 <span className="ml-2">+91 96069 73756</span>
          </p>
          <p className="mb-2">
            📧 <span className="ml-2">care@platinumrx.in</span>
          </p>
          <p className="mb-4">
            📍
            <span className="ml-2">
              10/8/8, K. no. 10&11, 1st Floor, 25th A Cross, 24th Main Rd,
              Sector 2, HSR Layout, Bengaluru, Karnataka 560102
            </span>
          </p>
          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-white hover:text-gray-200">
              <i className="fab fa-whatsapp text-2xl"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              <i className="fas fa-times text-2xl"></i>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-xl font-bold mb-4">
            We are happy to hear from you
          </h2>
          <form className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Phone Number"
                className="w-1/2 p-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-1/2 p-2 border border-gray-300 rounded"
              />
            </div>
            <textarea
              placeholder="Write your message"
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
