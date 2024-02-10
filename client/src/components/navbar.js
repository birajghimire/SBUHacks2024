import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#F5F5F5] p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="mindscribe_logo.png" alt="Logo" className="w-14 h-14 mr-2" />
        <h1 className="text-[#1E1E1E] text-lg font-semibold">JOURNAL BOT</h1>
      </div>
      <div className="font-pacifico">
        <div className="flex items-center space-x-4 text-[#1E1E1E] text-[16px]">
          <a href="/home">
            Home
          </a>
          <a href="/contact">
            Contact Us
          </a>
          <a href="/about">
            About Us
          </a>
          <div className="flex items-center">
            <img
              src="pfp.png"
              alt="Profile Icon"
              className="w-8 h-8 rounded-full"
            />
            <span className="ml-2 text-base text-[14px]">Hao Duong</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
