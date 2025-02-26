import { Avatar } from "@mantine/core";
import { Rating } from '@mantine/core';

function Testimonials()
{
    return <div className="mt-24 pb-5">
      <div className="text-4xl text-center font-semibold mb-3 text-mine-shaft-400">
        What <span className="text-bright-sun-400">User</span> says about us?
      </div>
    
      <div className="flex">
      <div className="flex flex-col gap-3 w-[23%] border border-bright-sun-400 p-3 rounded-xl mt-10 mx-8">
          <div className="flex gap-2 items-center">
          <Avatar className="h-20 w-20" src='avatar.png'></Avatar>
          <div>
            <div className="text-lg text-mine-shaft-100 font-semibold">Aayush Patel</div>
            <Rating color="brightSun.4" value={3.5} fractions={2} readOnly />
          </div>
          </div>
          <div className="text-xs text-mine-shaft-300">This platform made it easy to donate and support causes I care about. Highly recommend!</div>
      </div>

      <div className="flex flex-col gap-3 w-[23%] border border-bright-sun-400 p-3 rounded-xl mt-10 mx-8">
          <div className="flex gap-2 items-center">
          <Avatar className="h-20 w-20" src='avatar.png'></Avatar>
          <div>
            <div className="text-lg text-mine-shaft-100 font-semibold">Aarav Mehta</div>
            <Rating color="brightSun.4" value={3.5} fractions={2} readOnly />
          </div>
          </div>
          <div className="text-xs text-mine-shaft-300">I contributed to the 'Clean Water Access initiative, and seeing the impact was truly heartwarming!</div>
      </div>

      <div className="flex flex-col gap-3 w-[23%] border border-bright-sun-400 p-3 rounded-xl mt-10 mx-8">
          <div className="flex gap-2 items-center">
          <Avatar className="h-20 w-20" src='avatar.png'></Avatar>
          <div>
            <div className="text-lg text-mine-shaft-100 font-semibold">Swapnil Pandey</div>
            <Rating color="brightSun.4" value={3.5} fractions={2} readOnly />
          </div>
          </div>
          <div className="text-xs text-mine-shaft-300">Thanks to generous donors, our village now has access to clean drinking water. Forever grateful!</div>
      </div>
      
      <div className="flex flex-col gap-3 w-[23%] border border-bright-sun-400 p-3 rounded-xl mt-10 mx-8">
          <div className="flex gap-2 items-center">
          <Avatar className="h-20 w-20" src='avatar.png'></Avatar>
          <div>
            <div className="text-lg text-mine-shaft-100 font-semibold">Ravi Verma</div>
            <Rating color="brightSun.4" value={3.5} fractions={2} readOnly />
          </div>
          </div>
          <div className="text-xs text-mine-shaft-300">This donation platform is transparent and impactful. I feel confident knowing my support is reaching those in need</div>
      </div>
      </div>

    </div>
}

export default Testimonials;