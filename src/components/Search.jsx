export const Search = ()=>{
    return(
        <input placeholder="Search(Tạm Thời Để Trang Trí =)) )" className="font-proteststrike h-bsh rounded-srch w-srch placeholder:text-center opacity-90 top-5 relative p-4 hover:scale-srch hover:opacity-85 duration-200" onKeyDown={(e)=>{
            if(e.key === "Enter"){
                console.log('Hi');
            }
        }}></input>
    )
}