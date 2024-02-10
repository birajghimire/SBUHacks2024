import React from "react";

const JournalBox = ({ backgroundColor, text}) => {
  const bgClass = `bg-[${backgroundColor}]`;
  console.log(bgClass)

  // Define a style object to set the background image
  const journalBoxStyle = {
    backgroundImage: 'url("ink_layer.svg")', // Set the background image
    backgroundSize: 'cover', // Adjust the background size to cover the container
    backgroundPosition: 'center', // Center the background image
  };

  return (
    <div className={`${bgClass} border-2 w-1/6 h-1/2 border-black rounded-r-[20px] rounded-rl-[20px] m-[30px] shadow-md relative overflow-hidden`} style={journalBoxStyle}>
      <div className="flex justify-center mt-4 pt-4 z-10a font-amatic-sc absolute inset-0">
        <h2 className="text-xl h-1/5 font-semibold border-4 bg-white border-black rounded-lg text-gray-800 pt-3 pr-4 pl-4">{text}</h2>
      </div>
    </div>
  );
};

export default JournalBox;
