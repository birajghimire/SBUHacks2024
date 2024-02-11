import React from "react";

const patterns = [
  { id: "default", name: "ink", img: "url(ink_layer.svg)" },
  { id: "flowers", name: "flowers", img: "url(flowers.png)" },
  { id: "pattern2", name: "fillinblank2", img: "url(ink_layer.svg)" },
];

const JournalBox = ({ key, title, shortDescription, color, pattern }) => {
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
      <div className="w-[15%] h-full absolute top-0 left-0 border-slate-400 border-r-2"></div>
      <div className="flex justify-center font-amatic-sc absolute top-8 left-4 right-0">
        <h2 className="text-xl h-1/5 font-semibold border-2 bg-white border-black rounded-lg text-gray-800 pt-3 pr-4 pl-4 box-border">
          {title}
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
