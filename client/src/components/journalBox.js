import React from "react";
import { Menu } from "@headlessui/react";
import axios from "axios";
import JournalModalBox from "./journalModalBox";

const patterns = [
  { id: "default", name: "ink", img: "url(ink_layer.svg)" },
  { id: "flowers", name: "flowers", img: "url(flowers.png)" },
  { id: "pattern2", name: "fillinblank2", img: "url(ink_layer.svg)" },
];

const JournalBox = ({ journalId, title, shortDescription, color, pattern, onJournalDeleted, onEdit, setAlertMessage }) => {
  const handleDelete = async () => {
    try {
      const deletedJournal = await axios.delete(`http://localhost:8000/journal/${journalId}`);
      console.log(deletedJournal);
      setAlertMessage("Journal Successfully Deleted")
      onJournalDeleted();
    } catch (error) {
      console.log("Error deleting the journal: ", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: color,
        backgroundImage: patterns.find((p) => p.id === pattern).img,
      }}
      className={
        "border-2 w-1/6 h-1/2 border-black rounded-r-[20px] rounded-rl-[20px] m-[30px] shadow-md relative overflow-hidden bg-cover bg-center"
      }
    >
      <Menu as="div" className="absolute top-0 right-0 mt-2 mr-2">
        <Menu.Button className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => onEdit({ journalId, title, shortDescription, color, pattern })}
                  className={`${active ? "bg-gray-100" : ""} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleDelete}
                  className={`${active ? "bg-gray-100" : ""
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>

      <div className="w-[15%] h-full absolute top-0 left-0 border-slate-400 border-r-2"></div>
      <div className="flex justify-center font-amatic-sc absolute top-8 left-4 right-0">
        <h2 className="text-xl h-1/5 font-semibold border-2 bg-white border-black rounded-lg text-gray-800 pt-3 pr-4 pl-4 box-border">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default JournalBox;
