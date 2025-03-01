import { Button, Divider } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import Profile from '../UserProfile/Profile';

function UserProfile()
{
    return <div className="min-h-screen bg-mine-shaft-950 font-['poppins]">
        <Divider color="#5a5a5a"size="xs" mx="md"/>
        <Link to="/Causes">
        <div className='text-bright-sun-400 mt-3 m-3'>
        <Button leftSection = {<IconArrowLeft stroke={2} />} color='brightSun.4' variant='light'>Back</Button>
        </div>

        <div className=''>
               <Profile></Profile>
        </div>
        </Link>
    </div>
}

export default UserProfile;