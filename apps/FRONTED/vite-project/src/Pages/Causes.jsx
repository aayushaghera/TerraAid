
import Ngo from "../Causes/Ngo";
import SearchBar from "../Causes/SearchBar";
import { Divider } from '@mantine/core';

function Causes()
{
    return <div className="min-h-screen bg-mine-shaft-950 font-['poppins]">
        <Divider color="#5a5a5a"size="xs" mx="md"/>
        <SearchBar></SearchBar>
        {/* <Divider color="#5a5a5a" size="xs" mx="md"/> */}
        <Ngo></Ngo>
    </div>
}

export default Causes;