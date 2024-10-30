import React, { useState, useMemo, useEffect } from "react";
import { SketchPicker, ChromePicker } from "react-color";
import JournalModalBox from "./journalModalBox";
import axios from "axios";

require('dotenv').config();
const patterns = [
  { id: "default", name: "ink", img: "url(ink_layer.svg)" },
  { id: "flowers", name: "flowers", img: "url(flowers.png)" },
  { id: "rainbow", name: "rainbow", img: "url(rainbow.png)" },
];

const JournalModal = ({ isOpen, onClose, onJournalCreated, editingJournal, setAlertMessage }) => {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [color, setColor] = useState("#fff");
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [pattern, setPattern] = useState(patterns[0].id);

  useEffect(() => {
    if (isOpen && editingJournal) {
      setTitle(editingJournal.title);
      setShortDescription(editingJournal.shortDescription);
      setColor(editingJournal.color);
      setPattern(editingJournal.pattern);
    }
  }, [isOpen, editingJournal]);

  const toggleColorPicker = () => {
    setColorPickerOpen((prev) => !prev);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handlePatternChange = (e) => {
    setPattern(e.target.value);
  };

  const trapClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const clearAllFields = () => {
    setTitle("");
    setShortDescription("");
    setColor("#fff");
    setPattern(patterns[0].id);
    setColorPickerOpen(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const journalData = { title, shortDescription, color, pattern };

    try {
      let response;
      if (editingJournal) {
        // Update existing journal
        response = await axios.put(`${process.env.API_URL}/journal/${editingJournal.journalId}`, journalData);
        setAlertMessage("Journal Successfully Edited"); // Use the function to set the alert message
      } else {
        // Create new journal
        response = await axios.post(`${process.env.API_URL}/journal`, journalData);
        setAlertMessage("Journal Successfully Created"); // Use the function to set the alert message
      }
      console.log("Journal saved: ", response.data);
      onJournalCreated(); // Notify parent component to refresh list
      onClose(); // Close the modal
      clearAllFields(); // Clear the form fields
    } catch (error) {
      console.log("Error saving the journal", error);
    }
  };

  const handleX = async (e) => {
    e.preventDefault();
    try {
      onClose();
      clearAllFields();
    } catch (error) {
      console.log("Did not close");
    }
  };

  const patternImage = useMemo(() => {
    return patterns.find((p) => p.id === pattern).img;
  }, [pattern]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#F5F5F5] w-[65%] h-[80%] rounded-xl shadow-lg p-6 relative flex flex-col items-stretch gap-2">
        <button
          className="absolute top-2 right-2 bg-transparent border-none text-gray-400 hover:text-gray-600"
          onClick={handleX}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-3xl font-semibold underline font-amatic-sc">
          New Journal
        </h2>
        <div className="flex flex-row [&>div]:flex-1 items-stretch gap-8 flex-1">
          <div className="flex items-center justify-center">
            <div className="max-w-md w-full font-protest-riot flex flex-col bg-color space-y-4 pb-40">
              <div>
                <input
                  type="text"
                  placeholder="Title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-b border-gray-700 text-[#6F6F6F] bg-[#F5F5F5] px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Describe Your AI Companion..."
                  className="w-full border-b border-gray-700 text-[#6F6F6F] bg-[#F5F5F5] px-3 py-2 focus:outline-none focus:border-blue-500"
                  onChange={(e) => setShortDescription(e.target.value)}
                />
              </div>
              <div>
                <select
                  value={pattern}
                  onChange={handlePatternChange}
                  className="w-full border-b border-gray-700 text-[#6F6F6F] bg-[#F5F5F5] px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                  {patterns.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={color}
                  readOnly
                  placeholder="Color Hex"
                  className="w-full border-b border-gray-700 text-[#6F6F6F] bg-[#F5F5F5] px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                <div
                  className="w-6 h-6 absolute top-1/2 right-2 hover:border-2 hover:border-slate-300 border-box -translate-y-1/2 border border-black"
                  style={{ backgroundColor: color }}
                  onClick={toggleColorPicker}
                >
                  <span className="sr-only">Pick Color</span>
                  <div
                    className="absolute bottom-0 right-0 top-10"
                    style={{ display: colorPickerOpen ? "block" : "none" }}
                    onClick={trapClick}
                  >
                    <ChromePicker
                      color={color}
                      onChange={handleColorChange}
                      className=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-4 items-stretch">
              <JournalModalBox
                backgroundColor={color}
                text={title}
                patternImage={patternImage}
              />

              <button
                onClick={handleCreate}
                className="bg-white text-black text-3xl font-bold border-2 border-black px-4 py-2 rounded font-amatic-sc active:bg-slate-400 transition-colors"
              >
                {editingJournal ? "Save" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalModal;
