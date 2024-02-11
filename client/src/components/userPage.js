import React, { useEffect } from "react";
import './options.css';
import { useDispatch, useSelector } from "react-redux";
import { selectText, update } from "../notebookEditorSlice";
const UserPage = React.forwardRef((props, ref) => {
    const msg = useSelector(selectText);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("Hello");
    }, []);
    return (
        <div className={`bg-page page bg-white ${props.side ? 'page-right' : 'page-left'}`} ref={ref}>
            <div className="flex items-stretch h-full w-full">
                {!props.side && <div onClick={props.turnDirection} className="w-8">
                </div>}
                <textarea
                    placeholder="Start Typing"
                    rows="6"
                    autoFocus
                    value={msg}
                    className="text-black bg-transparent border-none outline-none resize-none h-full w-full rounded-md px-4 text-sm pt-2.5"
                    onChange={e => dispatch(update(e.target.value))}
                />
                {props.side && <div onClick={props.turnDirection} className="w-8">
                </div>}
            </div>
        </div>
    );
});
export default UserPage;