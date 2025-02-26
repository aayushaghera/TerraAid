import { IconId } from '@tabler/icons-react';
import { IconTipJar } from '@tabler/icons-react';
import { IconWorld } from '@tabler/icons-react';

function Working()
{
    return <div className="mt-24 pb-5">
        <div className="text-4xl text-center font-semibold mb-3 text-mine-shaft-400">
        How It <span className="text-bright-sun-400">Works</span>
        </div>

       <div className="text-lg mx-auto text-mine-shaft-300 text-center w-1/2">
       Easily support causes you care about and make a real difference in people's lives.
       </div>
       
       <div className='flex px-16 justify-between items-centers mt-11'>
        <div>
           <img className="w-[30rem]" src="Girl.png"></img>
        </div>

        <div>
            <div className='flex items-center gap-5 mt-20'>
              <div className='p-3 bg-bright-sun-300 text-mine-shaft-900 rounded-full'>
            <IconId className='h-10 w-10' stroke={2} />
             </div>
             <div>
                <div className='text-mine-shaft-200 text-xl font-semibold'>Choose a Cause</div>
                <div className='text-mine-shaft-300'>Explore various causes and select the one you want to help.</div>
             </div>
        </div>
        <div className='flex items-center gap-5 mt-11'>
              <div className='p-3 bg-bright-sun-300 text-mine-shaft-900  rounded-full'>
            <IconTipJar  className='h-10 w-10' stroke={2} />
             </div>
             <div>
                <div className='text-mine-shaft-200 text-xl font-semibold'>Make a Donation</div>
                <div className='text-mine-shaft-300'>Donate securely to the cause of your choice.</div>
             </div>
        </div>
        <div className='flex items-center gap-5 mt-11'>
              <div className='p-3 bg-bright-sun-300 text-mine-shaft-900  rounded-full'>
            <IconWorld className='h-10 w-10' stroke={2} />
             </div>
             <div>
                <div className='text-mine-shaft-200 text-xl font-semibold'>Spread the Word</div>
                <div className='text-mine-shaft-300'>Encourage others to join and help support meaningful change.</div>
             </div>
        </div>

        </div>
       </div>
    </div>
}

export default Working;