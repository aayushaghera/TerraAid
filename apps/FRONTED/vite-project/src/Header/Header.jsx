
import { IconProgressHelp } from '@tabler/icons-react';
import { IconBell } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';
import { Avatar, Indicator } from '@mantine/core';
import NavLinks from './NavLinks';
import { Link } from 'react-router-dom';

function Header ()
{
    return(
    <div className="w-full bg-black px-6 text-white h-20 flex justify-between items-center bg-mine-shaft-950 ">
        <div className='flex gap-3 items-center text-bright-sun-400 '>
        <IconProgressHelp className='h-8 w-8' stroke={2} />
          <div className='text-2xl font-semibold '>TerraAid</div> 
        </div>

     {NavLinks()}

        <div className='flex gap-3 items-center'>
        
            <div className='flex items-center gap-2'>
            <div>aayush</div>  
            <Link to="/UserProfile">  
            <Avatar src='avatar.png'></Avatar>
            </Link> 
            </div>
        
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