
import { IconProgressHelp } from '@tabler/icons-react';
import { IconBell } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';
import { Avatar, Indicator } from '@mantine/core';
import NavLinks from './NavLinks';
import { Link, useLocation } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

function Header ()
{
    const location = useLocation();

    // If pathname is "/SignUp" or "/Login", return null (do not render header)
//    if (location.pathname === "/SignUp" || location.pathname === "/Login") {
//     return null;
//     }
if (["/SignUp", "/Login", "/Admin", "/"].includes(location.pathname)) {
    return null;
}

    return(
    <div className="w-full bg-black px-6 text-white h-20 flex justify-between items-center bg-mine-shaft-950 ">
        <div className='flex gap-3 items-center text-bright-sun-400 '>
        <IconProgressHelp className='h-8 w-8' stroke={2} />
          <div className='text-2xl font-semibold '>TerraAid</div> 
        </div>

     {NavLinks()}

        <div className='flex gap-3 items-center'>
        
            {/* <div className='flex items-center gap-2'>
            <div>aayush</div>  
            <Avatar src='avatar.png'></Avatar>
            </div> */}
            {/* <Link to="/UserProfile">  
            <Avatar src='avatar.png'></Avatar>
            </Link>  */}

            <ProfileMenu></ProfileMenu>
        
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
    )
}

export default Header;