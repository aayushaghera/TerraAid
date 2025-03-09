import NGOChart from '../Dashboard/NGOChart';
import { Divider } from '@mantine/core';

function Dashboard()
{
    return <div className="min-h-screen bg-mine-shaft-950 font-['poppins]">
        <Divider color="#5a5a5a"size="xs" mx="md"/>
        <NGOChart></NGOChart>
    </div>

}
export default Dashboard;