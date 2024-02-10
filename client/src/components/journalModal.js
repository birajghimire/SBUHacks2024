import React from "react";
import { useState } from "react";
import { SketchPicker } from 'react-color'

const JournalModal = ({ isOpen, onClose }) => {
  const [color, setColor] = useState('#fff')
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Journal Entry</h2>
            <SketchPicker color={color} onChange={(color) => setColor(color.hex)}/>        
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default JournalModal;
