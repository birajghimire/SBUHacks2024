export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text
}){
    return(
        <>
        {
            type==='Button' ?
            <button
                type={action}
                className="group relative bg-slate-300 w-full flex justify-center py-2 px-4 text-sm font-protest-riot rounded-md text-black border-2 border-black hover:bg-black hover:text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                onSubmit={handleSubmit}
            >
                {text}
            </button>
            :
            <></>
        }
        </>
    )
}