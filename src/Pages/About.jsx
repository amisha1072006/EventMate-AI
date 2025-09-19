import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#faf3e0] to-[#c5a45a] 
 px-6 py-12 text-center">
      
     {/* Hero Section */}
   <section className="mb-16 text-center">
  <h1
  className="text-4xl md:text-5xl font-bold font-serif mb-4
    bg-gradient-to-r from-[#f5d500] via-[#ffd700] to-[#d6c08d]
    bg-clip-text text-transparent
    drop-shadow-md
    tracking-tight
    text-center"
>
  EventMate – Plan Smarter, Celebrate Better
</h1>

  <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto">
    Your AI-Powered Event Planner and Scheduler to organize flawless events effortlessly.
  </p>
   </section>

         {/* About Section */}
     <section className="mb-16 border-2 border-[#d4af37] rounded-xl p-8 md:p-12 text-center md:text-center
  shadow-[0_0_20px_#ffffff,0_0_30px_#ffffff,0_0_40px_#ffffff]">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 border-b-4 border-[#b9972c] inline-block pb-2 font-serif">
    About EventMate
  </h2>
  <p className="mt-6 text-xl md:text-2xl text-gray-800 leading-relaxed max-w-4xl mx-auto">
    EventMate is your smart AI-based event planner designed to simplify the way you organize and schedule events. From birthdays to conferences, EventMate helps you save time, reduce stress, and create unforgettable experiences with ease. Experience the next generation of event planning with our intuitive AI features and user-friendly interface.
  </p>
  </section>

   {/* Features Section with Neon Glow */}
  <section className="mb-16 border-2 border-[#d4af37] rounded-xl p-8 md:p-12 text-center md:text-center
  shadow-[0_0_20px_#ffffff,0_0_30px_#ffffff,0_0_40px_#ffffff]">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 border-b-4 border-[#b9972c] inline-block pb-2 font-serif mb-10">
    Features
  </h2>
  <div className="grid md:grid-cols-3 gap-8">
    
    {/* Feature Box 1 */}
    <div className="border-2 border-[#d4af37] rounded-xl p-6 hover:shadow-lg hover:scale-105 transition transform duration-300 shadow-[0_0_20px_#ffffff,0_0_30px_#ffffff,0_0_40px_#ffffff]">
      <h3 className="text-lg md:text-2xl font-semibold text-[#b9972c] font-serif">
        Smart Scheduling
      </h3>
      <p className="mt-3 text-xl text-gray-800">
        Automatically generates optimized event schedules using AI.
      </p>
    </div>

    {/* Feature Box 2 */}
    <div className="border-2 border-[#d4af37] rounded-xl p-6 hover:shadow-lg hover:scale-105 transition transform duration-300 shadow-[0_0_20px_#ffffff,0_0_30px_#ffffff,0_0_40px_#ffffff]">
      <h3 className="text-lg md:text-2xl font-semibold text-[#b9972c] font-serif">
        Venue Management
      </h3>
      <p className="mt-3 text-xl text-gray-800">
        Suggests the best venues and manages bookings with ease.
      </p>
    </div>

    {/* Feature Box 3 */}
    <div className="border-2 border-[#d4af37] rounded-xl p-6 hover:shadow-lg hover:scale-105 transition transform duration-300 shadow-[0_0_20px_#ffffff,0_0_30px_#ffffff,0_0_40px_#ffffff]">
      <h3 className="text-lg md:text-2xl font-semibold text-[#b9972c] font-serif">
        Real-time Updates
      </h3>
      <p className="mt-3 text-xl text-gray-800">
        Keep track of changes and updates instantly.
      </p>
    </div>

    {/* Feature Box 4 */}
    <div className="border-2 border-[#d4af37] rounded-xl p-6 hover:shadow-lg hover:scale-105 transition transform duration-300 shadow-[0_0_20px_#ffffff,0_0_30px_#ffffff,0_0_40px_#ffffff]">
      <h3 className="text-lg md:text-2xl font-semibold text-[#b9972c] font-serif">
        Personalized Recommendations
      </h3>
      <p className="mt-3 text-xl text-gray-800">
        Receive AI-powered suggestions for themes, vendors, and event ideas tailored to your preferences.
      </p>
    </div>

    {/* Feature Box 5 */}
    <div className="border-2 border-[#d4af37] rounded-xl p-6 hover:shadow-lg hover:scale-105 transition transform duration-300 shadow-[0_0_20px_#ffffff,0_0_30px_#ffffff,0_0_40px_#ffffff]">
      <h3 className="text-lg md:text-2xl font-semibold text-[#b9972c] font-serif">
        Task Management
      </h3>
      <p className="mt-3 text-xl text-gray-800">
        Organize, assign, and track all event tasks in one centralized platform.
      </p>
    </div>

    {/* Feature Box 6 */}
    <div className="border-2 border-[#d4af37] rounded-xl p-6 hover:shadow-lg hover:scale-105 transition transform duration-300 shadow-[0_0_20px_#ffffff,0_0_30px_#ffffff,0_0_40px_#ffffff]">
      <h3 className="text-lg md:text-2xl font-semibold text-[#b9972c] font-serif">
        Analytics & Insights
      </h3>
      <p className="mt-3 text-xl text-gray-800">
        Gain actionable insights on attendee engagement and event performance.
      </p>
    </div>

  </div>
</section>


       {/* Mission + Call to Action + Queries Section */}
<section className="mb-16 border-2 border-white rounded-xl p-8 md:p-12 text-center md:text-center
  shadow-[0_0_20px_#ffffff,0_0_30px_#ffffff,0_0_40px_#ffffff]">
  
  {/* Our Mission */}
  <div className="mb-10">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 border-b-4 border-[#b9972c] inline-block pb-2 font-serif">
      Our Mission
    </h2>
    <p className="mt-6 text-xl md:text-2xl text-gray-800 leading-relaxed max-w-4xl mx-auto">
      At EventMate, our mission is to empower people to focus on what truly
      matters – enjoying their events. By automating planning tasks and
      simplifying scheduling, we aim to make every celebration stress-free
      and memorable. We believe that event planning should be creative, 
      seamless, and fun for everyone involved.
    </p>
  </div>

  {/* Call to Action */}
  <div className="mb-10">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">
      Ready to Plan Your Event?
    </h2>
    <p className="mt-4 text-2xl text-gray-800">
      Let EventMate handle the stress while you enjoy the success.
    </p>
  </div>

  {/* Queries / Contact */}
  <div>
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-serif">
      Have any questions?
    </h2>
    <a
      href="/contact"
      className="px-6 py-3 bg-[#d4af37] text-white font-semibold rounded-lg shadow-md hover:bg-[#b9972c] transition text-lg"
    >
      Contact Us
    </a>
  </div>

</section>

      {/* Footer */}
      <footer className="py-6">
        <p className="text-gray-900 text-base md:text-lg">
          © 2025 <span className="text-[#b9972c] font-semibold">EventMate</span>. 
          All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
