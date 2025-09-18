import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/about"); 
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/homebackground.jpeg')" }}
    >
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 drop-shadow-md mb-4">
          Welcome to EventMate
        </h1>
        <p className="text-3xl md:text-xl font-bold text-gray-700 drop-shadow-md mb-8">
          Your event Amplified, Your planning Simplified.
        </p>
        <button
          onClick={handleExplore}
          className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-transform duration-300"
        >
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Home;
