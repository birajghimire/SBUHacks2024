import React from "react";

const JournalBox = ({ backgroundColor, text, patternImage }) => {
  return (
    <div
      style={{ backgroundColor, backgroundImage: patternImage }}
      className={
        "border-2 w-1/6 h-1/2 border-black rounded-r-[20px] rounded-rl-[20px] m-[30px] shadow-md relative overflow-hidden bg-cover bg-center"
      }
    >
      <div className="w-[15%] h-full absolute top-0 left-0 border-slate-400 border-r-2"></div>
      <div className="flex justify-center font-amatic-sc absolute top-8 left-4 right-0">
        <h2 className="text-xl h-1/5 font-semibold border-2 bg-white border-black rounded-lg text-gray-800 pt-3 pr-4 pl-4 box-border">
          hello world
        </h2>
      </div>
    </div>
  );
};
// const JournalBox = ({ backgroundColor, text, patternImage }) => {

//   // Define a style object to set the background image
//   const journalBoxStyle = {
//     backgroundImage: 'url("ink_layer.svg")', // Set the background image
//     backgroundSize: 'cover', // Adjust the background size to cover the container
//     backgroundPosition: 'center', // Center the background image
//   };

//   return (
//     <div className={`border-2 w-1/6 h-1/2 border-black rounded-r-[20px] rounded-rl-[20px] m-[30px] shadow-md relative overflow-hidden`} style={journalBoxStyle}>
//       <div className="flex justify-center mt-4 pt-4 font-amatic-sc absolute inset-0">
//         <h2 className="text-xl h-1/5 font-semibold border-4 bg-white border-black rounded-lg text-gray-800 pt-3 pr-4 pl-4">{text}</h2>
//       </div>
//     </div>
//   );
// };

export default JournalBox;
