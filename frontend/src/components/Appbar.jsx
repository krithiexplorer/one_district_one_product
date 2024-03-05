export const Appbar = ({onClick}) => {
    return <div className="border-black text-white h-14 flex justify-between bg-blue-500">
        <div className="flex flex-col justify-center h-full ml-4  text-lg font-normal">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 text-lg font-normal">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 ">
            <div className="flex flex-col justify-center h-full text-xl text-black">
                    U
                </div>
            </div>
           
                <button  className="text-lg  ml-2 p-2 cursor-pointer border border-2 border-solid border-indigo-100 rounded" onClick={onClick}>Logout</button>
        
        </div>
    </div>
}