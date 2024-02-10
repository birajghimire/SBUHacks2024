import React from "react";

const PlusButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-8 right-14">
      <button
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-black active:bg-blue-700 duration-150 focus:outline-none"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
};

export default PlusButton;
