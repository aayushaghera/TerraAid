// import NGOCard from "./NGOCard";
import NGOList from "./NGOList";


function Ngo()
{
    return <div className="p-5">
        <div className="flex justify-between">
           <div className="text-2xl text-mine-shaft-200 font-semibold mx-2 mt-2">Recommended Ngo</div>
        </div>
        {/* <NGOCard></NGOCard> */}
        <NGOList></NGOList>
    </div>
}

export default Ngo;