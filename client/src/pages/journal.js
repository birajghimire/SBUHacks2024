import React, {useCallback, useRef, useState, useMemo, useEffect} from 'react';
import HTMLFlipBook from 'react-pageflip';
import './journal.css'
import Page from '../components/userText';
import HardCover from '../components/hardCover';
import UserPage from '../components/userPage';
import FeedbackPage from '../components/aiPage';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//const items = [["Art of Jank Programming", "End me", "Brian Shao", "default", "#ffffff"], "Hello \nI am dead.", "That's so sad"];
const patterns = [
    { id: "default", name: "ink", img: "url(ink_layer.svg)" },
    { id: "flowers", name: "flowers", img: "url(flowers.png)" },
    { id: "pattern2", name: "fillinblank2", img: "url(ink_layer.svg)" },
  ];
function delay(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

function JournalPage() {
    let { journalId } = useParams();
    const [dataLoaded, setDataLoaded] = useState(false);
    const items = []
    const [entries, setEntries] = useState([]);
    const book = useRef();
    let pattern = "default";
    const getPages = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/journal/${journalId}`);
            console.log("response", response)
            if(response.status === 200)
            {
                pattern = patterns.find((p) => p.id === response.data.pattern).img
                items.push(response.data.title);
                items.push(response.data.shortDescription);
                items.push(response.data.color);
                console.log("items ", items);
                setDataLoaded(true);
                
            }
            let newEntries = [...entries];
            for (let i = 0; i < response.data.pages.length; i++) {
                newEntries.push(response.data.pages[i]);
            }
            setEntries(newEntries);
        } catch (error) {
          console.log("There was an error fetching the journals", error);
        }
      };
    useEffect(() => {
        console.log("UseEFfect")
        getPages();
        if(entries)
            console.log(entries);
        else
        {
            console.log("Empty journal");
        }
    }, []);
    const onFlip = useCallback((e) => {
        console.log('Current page: ' + e.data);
    }, []);

    const goNextPage = useCallback((e) => {
        book.current.pageFlip().flipNext()
    }, [book])

    const goPrevPage = useCallback((e) => {
        book.current.pageFlip().flipPrev()
    }, [book])

    const renderedItems = useMemo(() => {
        // Assuming `entries` is an object with `text` and `analysisResult` fields
        const elements = [];
        for(let i = 0; i < entries.length; i++)
        {
            if (entries.text) {
                // Create a Page component for the text field
                elements.push(
                    <Page 
                        key={"textfield"+i}
                        content={entries.text} 
                        side={false} // Assuming you want this on a specific side, adjust as needed
                        input={true} // Assuming this is for the text input
                        turnDirection={goPrevPage} // Adjust the turnDirection as needed
                    />
                );
            }
            if (elements.analysisResult) {
                // Create a Page component for the aiAnalysis field
                elements.push(
                    <Page 
                        key={"aiAnalysisField"+i} 
                        content={entries.analysisResult} 
                        side={true} // Assuming you want this on a specific side, adjust as needed
                        input={false} // Assuming this is not an input field but a display of analysis
                        turnDirection={goNextPage} // Adjust the turnDirection as needed
                    />
                );
            }
            console.log("ELEM IS",elements);
        }
        return elements;
    }, [entries, goNextPage, goPrevPage]);
    

    return (
        <div
            style={{
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
        }}>
        <HTMLFlipBook
            key="journal"
            width={500}
            height={625}
            // size="stretch"
            // minWidth={315}
            // maxWidth={1000}
            // minHeight={400}
            // maxHeight={1533}
            // maxShadowOpacity={0.5}
            showCover={true}
            // mobileScrollSupport={true}
            onFlip={onFlip}
            id="journal"
            ref={book}
            useMouseEvents={false}
        >
            <HardCover
                key={"FrontCover"}
                title={items[0]}
                description={items[1]}
                user=""
                pattern={pattern}
                color={items[2]}
                side={true}        
                turnDirection={goNextPage}
                cover={true}
            />
            <HardCover
                key={"BackCover"}
                color={items[2]}
                cover={false}
                side={false}
                turnDirection={goPrevPage}        
            />
            <Page 
                key={"Table of Contents"}
                side={true}
                turnDirection={goNextPage}
            />
            {renderedItems}
            <UserPage 
                key={"InputPage"}
                input={true}
                side={false}
                entries={entries}
                turnDirection={goPrevPage}
            />
            <FeedbackPage 
                id={journalId}
                key={"Feedback"}
                setEntries={setEntries}
                input={true}
                side={true}
                turnDirection={goNextPage}
            />
            <Page 
                key={"EndPage"}
                side={false}
                turnDirection={goPrevPage}
            />
            <HardCover 
                key={"EndCoverFront"}
                color={items[2]}
                cover={false}
                side={true}
                turnDirection={goNextPage}
            />
            <HardCover 
                key={"EndCoverBack"}
                color={items[2]}
                cover={false}
                side={false}
                turnDirection={goPrevPage}
            />
        </HTMLFlipBook>
        </div>
    )
}
export default JournalPage;