import './journal.css';
import HardCover from '../components/hardCover';
// import UserPage from '../components/userpage';
// import FeedbackPage from '../components/aipage';
import ContentsTable from '../components/tableContents';
import EntriesPage from '../components/allEntries';
import React, {useEffect, useState} from 'react';
const JournalPage = () => {
    const items = [["Art of Jank Programming", "End me", "Brian Shao"], "Hello \nI am dead.", "That's so sad"];
    //const entries = items.slice(1);
    const [text, setText] = useState("");
    const [entries, setEntries] = useState(items.slice(1));
    //const items = [/* your items here */];
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log(`Count has changed to: ${count}`);
      }, [count]);
    return (
        <div id="journal">
            <HardCover 
                title = {items[0][0]}
                description = {items[0][1]}
                user = {items[0][2]}
                pattern = "flowers_transparent.png"
                color = "black"
                text = "white"
            />
            <ContentsTable />
            <EntriesPage count={count} setCount={setCount} text={text} setText={setText} entries={entries} setEntries={setEntries}/>
            <div className="page" style={{borderTopLeftRadius: '5%', borderBottomLeftRadius: '5%'}}></div>
            <HardCover
                title=""
                description=""
                user=""
                pattern=""
                color="black"
            />
        </div>
        // <div class="h-full hover:border-blue-500 hover:border p-4 transition duration-150">
        //     Hover over me!
        //     <textarea placeholder='Message' rows="6"
        //                 class="h-full w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"></textarea>
        // </div>

    );
}

export default JournalPage;