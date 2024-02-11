import React, { useEffect } from "react";
import './options.css';
import './aipage.css'
import { useSelector } from "react-redux";
import { selectText } from "../notebookEditorSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FeedbackPage = React.forwardRef((props, ref) => {
    const msg = useSelector(selectText);
    const navigate = useNavigate();
    async function createFeedBack() {
        console.log("Creating Feedback");
        console.log(msg);
        const prompt = {"prompt" : msg};
        try{
            
            const response = await axios.post("http://localhost:8000/chat", prompt);
            const userBody = {"text" : msg, "aiAnalysis": {"analysisResult": response.data}};
            await axios.post(`http://localhost:8000/journal/${props.id}/pages`, userBody);
            // navigate(`/journal/${props.id}?skip=true`);
            window.location.reload();
        }
        catch(e){
            console.log(e);
        }
        //props.setEntries(prevEntries => [...prevEntries, msg, response.data]);
        //props.setEntries([...props.entries, props.text, "Ai Response"]);
    }
    return (
        <div className={`bg-page page bg-white ${props.side ? 'page-right' : 'page-left'}`} ref={ref}>
            <div className="flex items-stretch h-full w-full">
                {!props.side && <div onClick={props.turnDirection} className="w-8">
                </div>}
                <div className="w-full flex justify-center items-center">
                    <div onClick={createFeedBack} className="cursor-pointer">
                        <div className="btn rounded-full w-20 h-20 bg-neutral flex items-center justify-center">
                            <img src="/bot.png" alt="Default" className="w-12 h-12" />
                        </div>
                    </div>
                </div>
                {props.side && <div onClick={props.turnDirection} className="w-8">
                </div>}
            </div>
        </div>
    );
});
export default FeedbackPage;