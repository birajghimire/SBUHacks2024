import React from 'react';
import UserPage from "./userPage";
import FeedbackPage from "./aiPage";
import UserText from './userText';
const EntriesPage = (props) => {
    console.log("Entries are ", props.entries);
    const renderedItems = props.entries.map((item, index) => {
        // Skip the first item. Cover Info
        let left = true
        if (index % 2 !== 0)
        {
            left = false
        }
        //console.log("Rerendered ", props.entries);
        return <UserText key={index} content={item} side={left}/>;
    });

    return(
        <>
            {renderedItems}
            <UserPage setText={props.setText}/>
            <FeedbackPage setCount={props.setCount} text={props.text} entries={props.entries} setEntries={props.setEntries}/>
        </>
    );
};

export default EntriesPage;
