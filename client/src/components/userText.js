import React, { useEffect } from "react";
import './options.css';

const Page = React.memo(React.forwardRef((props, ref) => {
    useEffect(() => {
        console.log("rendered")
    }, [])
    return (
        <div className={`bg-page page bg-white border-solid border-2 border-sky-200 ${props.side ? 'page-right' : 'page-left'}`} ref={ref}>
            <div className="flex items-stretch h-full w-full">
                {!props.side && <div onClick={props.turnDirection} className="w-8">
                </div>}
                <div className={`flex-1 mt-8 text-black ${props.side ? 'pl-4 pr-4' : 'pr-4'}`}>
                    <div className="flex justify-between items-start">
                        <h1 className="flex-1">{props.content}</h1>
                    </div>
                    <p className="mt-4">{props.content}</p>
                </div>
                {props.side && <div onClick={props.turnDirection} className="w-8">
                </div>}
            </div>
        </div>
    );
}));

export default Page;
