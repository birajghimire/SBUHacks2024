import React, { useEffect } from "react";
import './options.css';
import './aipage.css'
import { useSelector } from "react-redux";
import { selectText } from "../notebookEditorSlice";
import axios from "axios";
const FeedbackPage = React.forwardRef((props, ref) => {
    const msg = useSelector(selectText);

    async function createFeedBack() {
        console.log("Creating Feedback");
        console.log(msg);
        const prompt = {"prompt" : msg};
        let response = "";
        try{

            response = await axios.post("http://localhost:8000/chat", prompt);
            const userBody = {"text" : msg, "aiAnalysis": {"analysisResult": response.data}};
            let storePage = await axios.post(`http://localhost:8000/journal/${props.id}/pages`, userBody);
            console.log(response);
            console.log(storePage)

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