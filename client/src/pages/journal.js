import React, { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './journal.css'
import Page from '../components/userText';
import HardCover from '../components/hardCover';
import UserPage from '../components/userPage';
import FeedbackPage from '../components/aiPage';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

//const items = [["Art of Jank Programming", "End me", "Brian Shao", "default", "#ffffff"], "Hello \nI am dead.", "That's so sad"];
// const patterns = [
const PATTERNS = [
    { id: "default", name: "ink", img: "url(/ink_layer.svg)" },
    { id: "flowers", name: "flowers", img: "url(/flowers.png)" },
    { id: "pattern2", name: "fillinblank2", img: "url(/ink_layer.svg)" },
];

const DEFAULT_PATTERN = PATTERNS[0].id

function JournalPage() {
    // let { journalId } = useParams();
    const { journalId } = useParams();
    let [searchParams] = useSearchParams();

    // set to true to prevent flashes before API request is sent
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const book = useRef();
    // useEffect(() => {
    //     if(loading || error || !data || !book.current)
    //         return;
    //     let temp = book.current.pageFlip();
    //     if(!temp)
    //     {
    //         return;
    //     }
    //     temp.turnToPage(data.pages.length+3);
    // }, [searchParams, loading, error, data, book]);
    // const [dataLoaded, setDataLoaded] = useState(false);

    // illegal to update constant inside useEffect
    // const items = []

    // const [entries, setEntries] = useState([]);
    // const [renderDelayPassed, setRenderDelayPassed] = useState(false);

    // let pattern = "default";
    // useEffect(() => {
    //     // Delay the rendering by X milliseconds
    //     const timer = setTimeout(() => {
    //         setRenderDelayPassed(true); // After the delay, allow rendering
    //     }, 10000); // Set delay in milliseconds

    //     return () => clearTimeout(timer); // Cleanup the timer
    // }, []);

    // const getPages = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:8000/journal/${journalId}`);
    //         setJournal(response.data);
    //         console.log("response", response)
    //     } catch (error) {
    //         console.log("There was an error fetching the journals", error);
    //     }
    // };

    // useEffect(() => {
    //     console.log("UseEFfect")
    //     getPages();
    //     console.log("JORN",journal)
    //     if(journal.status === 200)
    //     {
    //         pattern = patterns.find((p) => p.id === journal.data.pattern).img
    //         items.push(journal.data.title);
    //         items.push(journal.data.shortDescription);
    //         items.push(journal.data.color);
    //         console.log("items ", items);            
    //     }
    //     let newEntries = [...entries];
    //     for (let i = 0; i < journal.data.pages.length; i++) {
    //         newEntries.push(journal.data.pages[i]);
    //     }
    //     setEntries(newEntries);
    //     setDataLoaded(true);
    // }, []);

    useEffect(() => {
        // console.log("UseEFfect")
        // getPages();
        // console.log("JORN", journal)
        // if (journal.status === 200) {

        //     // this is illegal
        //     // pattern = patterns.find((p) => p.id === journal.data.pattern).img

        //     items.push(journal.data.title);
        //     items.push(journal.data.shortDescription);
        //     items.push(journal.data.color);
        //     console.log("items ", items);
        // }
        // let newEntries = [...entries];
        // for (let i = 0; i < journal.data.pages.length; i++) {
        //     newEntries.push(journal.data.pages[i]);
        // }
        // setEntries(newEntries);
        // setDataLoaded(true);
        console.log(journalId);
        const controller = new AbortController()

        async function loadData() {
            setLoading(true)
            setError(null)

            try {
                const { data } = await axios.get(`http://localhost:8000/journal/${journalId}`, {
                    signal: controller.signal
                })

                const {
                    title,
                    shortDescription,
                    color,
                    pattern,
                    pages,
                } = data

                setData({
                    title,
                    description: shortDescription,
                    color,
                    pattern: PATTERNS.find(p => p.id === pattern)?.img || DEFAULT_PATTERN,
                    pages,
                })
            } catch (e) {
                setError(e)
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        loadData()

        return () => controller.abort()
    }, [journalId]);

    // const onFlip = useCallback((e) => {
    const onFlip = useMemo(() => {
        return e => {
            console.log('Current page: ' + e.data);
        }
    }, []);

    // const goNextPage = useCallback((e) => {
    const goNextPage = useCallback(() => {
        book.current.pageFlip().flipNext()
    }, [book]);

    // callback functions take 0 parameters
    // const goPrevPage = useCallback((e) => {
    const goPrevPage = useCallback(() => {
        book.current.pageFlip().flipPrev()
    }, [book]);

    const goToEnd = useCallback(() => {
        book.current.pageFlip().turnToPage(2 * data.pages.length + 3);
    }, [book, data]);

    const renderedItems = useMemo(() => {
        console.log("data",data);
        if (!data)
            return []
        // Assuming `entries` is an object with `text` and `analysisResult` fields
        const elements = [];
        let i = 0;
        for (const page of data.pages) {
            // TODO: entries was an array
            // if (entries.text) {
            if (page.text) {
                // Create a Page component for the text field
                elements.push(
                    <Page
                        key={page.pageId + "-text"}
                        content={page.text}
                        side={false} // Assuming you want this on a specific side, adjust as needed
                        // input={true} // Assuming this is for the text input
                        input  // Assuming this is for the text input
                        turnDirection={goPrevPage} // Adjust the turnDirection as needed
                    />
                );
            }

            // TODO: elements is an array, how can it have a property [analysisResult]
            // if (elements.analysisResult) {
            if (page.aiAnalysis) {
                // Create a Page component for the aiAnalysis field
                elements.push(
                    <Page
                        key={page.pageId + "-aitext"}
                        content={page.aiAnalysis.analysisResult}
                        // side={true} // Assuming you want this on a specific side, adjust as needed
                        side // Assuming you want this on a specific side, adjust as needed
                        // input={false} // Assuming this is not an input field but a display of analysis
                        turnDirection={goNextPage} // Adjust the turnDirection as needed
                    />
                );
            }
            // console.log("ELEM IS", page);
        }

        return elements;
    }, [data, goNextPage, goPrevPage]);

    // if (!dataLoaded) {
    if (loading) {
        return <div>Loading...</div>; // Or any other placeholder content
    }

    if (error) {
        return <div>Error: {error?.message || "Error fetching journal"}</div>
    }

    if (!data) {
        return <div>Error: no journal data found</div>
    }
    console.log("Before return",data.pattern)
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
                //showCover
                // mobileScrollSupport={true}
                onFlip={onFlip}
                id="journal"
                ref={book}
                useMouseEvents={false}
            >
                <HardCover
                    goToEnd={goToEnd}
                    key={"FrontCover"}
                    title={data.title}
                    description={data.description}
                    user=""
                    pattern={data.pattern}
                    color={data.color}
                    // side={true}
                    side
                    turnDirection={goNextPage}
                    // cover={true}
                    cover
                />
                <HardCover
                    key={"BackCover"}
                    color={data.color}
                    // cover={false}
                    // side={false}
                    turnDirection={goPrevPage}
                />
                <Page
                    key={"Table of Contents"}
                    // side={true}
                    side
                    turnDirection={goNextPage}
                />
                {renderedItems}
                <UserPage
                    key={"InputPage"}
                    // input={true}
                    input
                    // side={false}
                    entries={data.pages}
                    turnDirection={goPrevPage}
                />
                <FeedbackPage
                    data={data}
                    id={journalId}
                    key={"Feedback"}
                    setData={setData}
                    // input={true}
                    input
                    // side={true}
                    side
                    turnDirection={goNextPage}
                />
                <Page
                    key={"EndPage"}
                    // side={false}
                    turnDirection={goPrevPage}
                />
                <HardCover
                    key={"EndCoverFront"}
                    color={data.color}
                    // cover={false}
                    // side={true}
                    side
                    turnDirection={goNextPage}
                />
                <HardCover
                    key={"EndCoverBack"}
                    color={data.color}
                    // cover={false}
                    // side={false}
                    turnDirection={goPrevPage}
                />
            </HTMLFlipBook>
        </div>
    )
}
export default JournalPage;