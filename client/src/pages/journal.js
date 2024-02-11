import React, {useCallback, useRef, useState, useMemo} from 'react';
import HTMLFlipBook from 'react-pageflip';
import './journal.css'
import Page from '../components/userText';
import HardCover from '../components/hardCover';
import UserPage from '../components/userPage';
import FeedbackPage from '../components/aiPage';
const items = [["Art of Jank Programming", "End me", "Brian Shao", "default", "#ffffff"], "Hello \nI am dead.", "That's so sad"];
const patterns = [
    { id: "default", name: "ink", img: "url(ink_layer.svg)" },
    { id: "flowers", name: "flowers", img: "url(flowers.png)" },
    { id: "pattern2", name: "fillinblank2", img: "url(ink_layer.svg)" },
  ];
const pattern = patterns.find((p) => p.id === items[0][3]).img
function JournalPage() {
    const [entries, setEntries] = useState(items.slice(1));
    //const [text, setText] = useState("");
    const book = useRef();
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
        return entries.map((item, index) => {
            let left = index % 2 !== 0;
            return <Page key={index} content={item} side={left} input={false} turnDirection={index % 2 !== 0 ? goNextPage : goPrevPage}/>;
        });
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
                title={items[0][0]}
                description={items[0][1]}
                user={items[0][2]}
                pattern={pattern}
                color={items[0][4]}
                side={true}        
                turnDirection={goNextPage}
                cover={true}
            />
            <HardCover
                key={"BackCover"}
                color={items[0][4]}
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
                key={"Feedback"}
                input={true}
                side={true}
                turnDirection={goNextPage}
            />
            {/* <Ded 
            goNextPage={goNextPage}
            goPrevPage={goPrevPage}
            /> */}
            <Page 
                key={"EndPage"}
                side={false}
                turnDirection={goPrevPage}
            />
            <HardCover 
                key={"EndCoverFront"}
                color={items[0][4]}
                cover={false}
                side={true}
                turnDirection={goNextPage}
            />
            <HardCover 
                key={"EndCoverBack"}
                color={items[0][4]}
                cover={false}
                side={false}
                turnDirection={goPrevPage}
            />
        </HTMLFlipBook>
        </div>
    )
}
export default JournalPage;