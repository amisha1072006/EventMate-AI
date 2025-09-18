import React from "react";

const Contact = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Contact Us
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          We'd love to hear from you! Fill out the form below.
        </p>

        {/* Form */}
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 mb-1">Message</label>
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="button"
              className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-transform duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
