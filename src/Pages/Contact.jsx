import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#faf3e0] to-[#c5a45a]
 text-gray-900 flex flex-col">
      {/* Hero Section */}
      <div className="w-full py-8 text-center bg-gradient-to-r from-[#faf3e0] to-[#c5a45a]
">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 border-b-4 border-[#b9972c] inline-block pb-2 mb-4 font-serif 
">
          Get In Touch
        </h1>
        <p className="text-lg md:text-xl text-gray-700 font-sans">
          We’re here to help you plan smarter & celebrate better.
        </p>
      </div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row flex-grow px-6 md:px-20 py-12 gap-12 max-w-6xl mx-auto w-full">
        {/* Contact Form */}
        <div className="md:w-2/3 bg-gray-50 shadow-lg rounded-2xl p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-gray-800 font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b9972c]"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b9972c]"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b9972c]"
              ></textarea>
            </div>

            <button
              type="button" // UI only, no backend
              className="bg-[#d4af37] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#56c5d4] transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Quick Contact Info */}
        <div className="md:w-1/3 flex flex-col justify-start bg-white p-8 rounded-2xl shadow-md md:text-xl">
          <h2 className="text-xl font-semibold mb-4 font-sans text-gray-800">
            Contact Info
          </h2>
          <p className="text-gray-700 mb-4">
            Have any questions about planning your next event?  
            Our team is ready to assist you with ideas, scheduling, or any queries you may have.  
          </p>
          <p className="text-gray-700 text-lg">
            Email us at:{" "}
            <span className="font-medium text-[#b9972c]">
              hello@eventmate.ai
            </span>
          </p>
          <p className="mt-4 text-lg text-gray-600">
            We usually respond within 24 hours.  
            For urgent matters, please mention “Priority” in your subject line.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 py-6 border-t">
        © 2025 EventMate. All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
