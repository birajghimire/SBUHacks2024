import './hardcover.css';

const HardCover = (props) => {
    return (
        <>
            <div className="cover hard" style={{ backgroundImage: 'none', backgroundColor: props.color, color:props.text}}>
                {props.pattern && <img className="flowers" src={props.pattern} alt=""/>}
                <h1>{props.title}</h1>
                <h2>{props.description}</h2>
                <h4>{props.user}</h4>
            </div>
            <div className="coverback hard"></div>
        </>
    );
}

export default HardCover;
