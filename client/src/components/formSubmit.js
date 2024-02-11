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
                className="group relative w-full flex justify-center py-2 px-4 text-sm font-protest-riot rounded-md border-2 border-black bg-black text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 mt-10"
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