import './aipage.css'

const FeedbackPage = (props) => {
    function createFeedBack() {
        console.log("Creating FeedBack");
        console.log("User text ", props.text);
        console.log("Entries in feedback is ", props.entries);
        props.setEntries([...props.entries, props.text, "Ai Response"]);
        console.log("Entries in feedback is ", props.entries);

    }
    return (
        <div className="page flex justify-center items-center" style={{ borderTopRightRadius: '5%', borderBottomRightRadius: '5%' }}>
            {<div onClick={createFeedBack} className="avatar">
                <div className="rounded-full w-20 bg-neutral flex items-center justify-center">
                    <div className="w-24 btn btn-ghost btn-circle text-neutral-content">
                        <img src={"bot.png"} alt="Default" />
                    </div>
                </div>
            </div>}
        </div>
    );
}
export default FeedbackPage;