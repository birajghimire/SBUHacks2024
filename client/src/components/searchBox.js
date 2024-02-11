// SearchBox.js

import React from "react";

const SearchBox = ({ setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="bg-[#F4D598] rounded-[10px] py-2 pl-10 pr-4 w-[650px] focus:outline-none focus:ring-2 focus:ring-blue-500 font-protest-riot"
          onChange={handleSearchChange}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
