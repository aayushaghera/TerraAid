// import NGOCard from "./NGOCard";
import NGOList from "./NGOList";


function Ngo()
{
    return <div className="p-3">
        <div className="flex justify-between">
           <div className="text-2xl text-mine-shaft-200 font-semibold mx-2 mt-0">Recommended Ngo</div>
        </div>
        {/* <NGOCard></NGOCard> */}
        <NGOList></NGOList>
    </div>
}

export default Ngo;