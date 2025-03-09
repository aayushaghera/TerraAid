import { Divider } from '@mantine/core';
import NGODetailsComponent from '../NGODetails/NGODetailsComponent';

function NGODetails()
{

    return <div className="min-h-screen bg-mine-shaft-950 font-['poppins]">
    <Divider color="#5a5a5a"size="xs" mx="md"/>
    <NGODetailsComponent></NGODetailsComponent>
    
</div>

}
export default NGODetails;