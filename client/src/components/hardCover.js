import React from "react";
import './options.css'

const HardCover = React.forwardRef((props, ref) => {
    console.log("HARD",props);
  // console.log(props.color)
   console.log(props.pattern)
  return (
    <div ref={ref}>
      <div style={{ 
          backgroundColor: props.color, 
          borderTopRightRadius: props.side ? '5%' : '0',
          borderBottomRightRadius: props.side ? '5%' : '0',
          borderTopLeftRadius: props.side ? '0' : '5%',
          borderBottomLeftRadius: props.side ? '0' : '5%',
          backgroundImage: props.cover ? props.pattern : "",          
        }} 
          className="border border-2 border-gray-200 bg-cover bg-center flex items-stretch h-full w-full"  
        >
        {!props.side && <div onClick={props.turnDirection} className="w-8">
        </div>}

        {props.cover ? 
        (<div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="border-2 border-black rounded-r-lg rounded-l-lg m-5 shadow-md relative overflow-hidden">
            <h1 className="py-2 px-4 text-black text-center text-5xl">{props.title}</h1>
          </div>
          <p className="text-black text-center text-3xl">{props.description}</p>
          <p className="text-black text-center text-xl">{props.user}</p>
        </div>) : 
        (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 -mt-48">
          <h1 className="py-2 px-4 text-black text-center text-5xl">{props.title}</h1>
          <p className="text-black text-center text-3xl">{props.description}</p>
          <p className="text-black text-center text-xl">{props.user}</p>
        </div>
        )}
        {props.side && <div onClick={props.turnDirection} className="w-8">
        </div>}
      </div>
      <div onClick={props.goToEnd} className="btn">Hi</div>
    </div>
  );
});

export default HardCover;
