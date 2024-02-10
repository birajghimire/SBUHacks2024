const UserText = (props) => {
    const style = props.side
        ? { borderTopLeftRadius: '5%', borderBottomLeftRadius: '5%' }
        : { borderTopRightRadius: '5%', borderBottomRightRadius: '5%' };

    return(
        <div className="page" style={style}> 
            <div className="content">
                <p style={{ whiteSpace: 'pre-wrap' }}>
                    {props.content}
                </p>
                <p>
                    wadawdwadwad
                </p>
            </div>
        </div>
    );
}

export default UserText;
