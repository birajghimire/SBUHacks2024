import React, { useState, useEffect } from "react";
import { SketchPicker } from 'react-color';
import JournalBox from "./journalBox";

const JournalModal = ({ isOpen, onClose }) => {
  const [color, setColor] = useState('#fff');
  const [title, setTitle] = useState('');

  // Update the color state when SketchPicker color changes
  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#F5F5F5] w-2/5 h-4/6 rounded-xl shadow-lg p-6 flex flex-row relative">
        <button className="absolute top-2 right-2 bg-transparent border-none text-gray-400 hover:text-gray-600" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-2/5 font-pacifico flex flex-col bg-color">
          <h2 className="text-3xl font-semibold mb-4 underline font-amatic-sc">New Journal</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-b border-gray-700 text-[#6F6F6F] bg-[#F5F5F5] px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input type="text" placeholder="Short Prompt" className="w-full border-b border-gray-700 text-[#6F6F6F] bg-[#F5F5F5] px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <input type="text" value={color} readOnly placeholder="Color Hex" className="w-full border-b border-gray-700 text-[#6F6F6F] bg-[#F5F5F5] px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mt-6">
            <SketchPicker color={color} onChange={handleColorChange} width="95%" height="80%" />
          </div>
        </div>
        <div className="w-full">
          <JournalBox backgroundColor={color} text={title} />
        </div>
      </div>
    </div>
  );
};

export default JournalModal;
