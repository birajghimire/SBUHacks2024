

const UserPage = (props) => {
    return(
        <div className="page" style={{borderTopLeftRadius: '5%', borderBottomLeftRadius: '5%'}}> 
            <textarea placeholder='Start Typing' rows="6" className="bg-transparent resize-none h-full w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]" style={{borderTopLeftRadius: '5%', borderBottomLeftRadius: '5%'}}
            onChange={e => props.setText(e.target.value)}>

            </textarea>
        </div>
    );
}
export default UserPage;