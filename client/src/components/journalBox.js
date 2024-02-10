import React from "react";

const JournalBox = () => {
  return (
    <div className="bg-white border-2 w-1/6 h-1/2 border-black rounded-r-[20px] rounded-rl-[20px] m-[30px] shadow-md relative overflow-hidden">
      <img
        src="journalbg.png"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Journal Background"
      />
      <div className="flex justify-center mt-4 pt-4 z-10 font-amatic-sc absolute inset-0">
        <h2 className="text-xl h-1/5 font-semibold border-4 border-black rounded-lg text-gray-800 pt-[6px] pr-4 pl-4">My Journalfwejifwjf</h2>
      </div>
    </div>
  );
};

export default JournalBox;
