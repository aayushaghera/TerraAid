import NGOList from "./NGOList";


function NGO()
{
    return <div className="p-5">
        <div className="flex justify-between">
           <div className="text-2xl text-mine-shaft-200 font-semibold mx-2 mt-2">NGO Fundraising Reports</div>
        </div>
        <NGOList></NGOList>
    </div>
}

export default NGO