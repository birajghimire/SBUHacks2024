import React from "react";

const JournalModalBox = ({ backgroundColor, text, patternImage }) => {
  return (
    <div
      style={{ backgroundColor, backgroundImage: patternImage }}
      className={
        "border-2 w-72 h-96 border-black rounded-r-[20px] rounded-rl-[20px] shadow-md relative overflow-hidden bg-cover bg-center"
      }
    >
      <div className="w-[15%] h-full absolute top-0 left-0 border-slate-400 border-r-2"></div>
      <div className="flex justify-center font-amatic-sc absolute top-8 left-4 right-0">
        <h2 className="text-xl h-1/5 font-semibold border-2 bg-white border-black rounded-lg text-gray-800 pt-3 pr-4 pl-4 box-border">
          {text.trim().slice(0, 25) || (
            <em className="text-slate-400">Title</em>
          )}
        </h2>
      </div>
    </div>
  );
};

export default JournalModalBox;
