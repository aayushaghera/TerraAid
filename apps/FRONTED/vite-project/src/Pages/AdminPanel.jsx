import { Divider, Indicator } from '@mantine/core';
import { IconProgressHelp, IconBell, IconSettings } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import ProfileMenu from '../Header/ProfileMenu';
import NGOFundraisingReport from '../Admin/NGOFundraisingReport';

function AdminPanel() {
    return (
        <div className="min-h-screen bg-mine-shaft-950 font-['poppins]">

            {/* ✅ Hardcoded Admin Header with Navigation */}
            <div className="w-full bg-black px-6 text-white h-20 flex justify-between items-center bg-mine-shaft-950">
                
                {/* Logo & Title */}
                <div className='flex gap-3 items-center text-bright-sun-400'>
                    <IconProgressHelp className='h-8 w-8' stroke={2} />
                    <div className='text-2xl font-semibold'>TerraAid Admin</div>
                </div>

                {/* ✅ Admin Navigation Links */}
                <nav className="flex gap-5 items-center text-mine-shaft-300 h-full">
                    <Link to="" className="hover:text-bright-sun-400 transition">Dashboard</Link>
                    <Link to="" className="hover:text-bright-sun-400 transition">Reports</Link>
                    <Link to="" className="hover:text-bright-sun-400 transition">Users</Link>
                    <Link to="" className="hover:text-bright-sun-400 transition">Settings</Link>
                </nav>

                {/* Profile & Icons */}
                <div className='flex gap-3 items-center'>
                    <ProfileMenu />

                    <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
                        <IconSettings stroke={2} /> 
                    </div>

                    <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
                        <Indicator color="blue" offset={7} size={9} processing>
                            <IconBell stroke={2} />  
                        </Indicator>
                    </div>
                </div>
            </div>

            {/* ✅ Divider below Header */}
            <Divider color="#5a5a5a" size="xs" mx="md" />
             <div className='mt-3'>
            <NGOFundraisingReport></NGOFundraisingReport>
            </div>
        </div>
    );
}

export default AdminPanel;
