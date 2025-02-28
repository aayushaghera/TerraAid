import { IconUserSquare } from '@tabler/icons-react';
import { IconBookmark } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';
import { Text } from '@mantine/core';
import {  Divider } from '@mantine/core';
import { Button } from '@mantine/core';
import { IconClockHour3 } from '@tabler/icons-react';

// function NGOCard()
// {
//     return <div className='bg-mine-shaft-900 p-4 w-72 mt-5 flex flex-col gap-2'>
//             <div className='flex justify-between'>
//                 <div className='flex gap-2 items-center'>
//                     <div className='p-2 bg-mine-shaft-800 rounded-md'>
//                          <IconUserSquare className='h-7 text-bright-sun-400' stroke={2} />
//                     </div>
//                     <div>
//                         <div className='text-mine-shaft-200 font-semibold'>Helping Hand</div>
//                         <div className='text-mine-shaft-300 text-xs'>Gujarat</div>
//                     </div>
//                 </div>
//                 <IconBookmark className='text-mine-shaft-200 cursor-pointer' stroke={2} />
//             </div>
//             <div className='text-mine-shaft-200 mt-2'>
//              <TextInput
//                 variant="unstyled"
//                 label="Donation Amount"
//                 placeholder="Enter amount"
//                 styles={{
//                   input: {
//                   color: 'white'
//                },
//               }}
//             />
//             </div>
//             <div className="text-mine-shaft-100 text-sm">
//             <span className="font-semibold text-bright-sun-400">Goal : </span>₹2 Cr
//             </div>
//             <div>
//             <Text className='!text-xs text-justify !text-mine-shaft-300'  lineClamp={3}>
//             An NGO platform is a digital space that connects non-profits with donors, volunteers, and beneficiaries.
//              It facilitates fundraising, project management, and awareness campaigns to drive social impact.
//              The platform ensures transparency, engagement, and efficiency in achieving humanitarian goals.
//             </Text>
//             </div>
//             <Divider mt={8} size="xs" mx="" color="#5a5a5a" />

//             <div className='flex gap-20 justify-between items-center'>
//                 <div><Button  mt={7} variant="filled" color="yellow" radius="md">Button</Button></div>
//                 <div className="flex items-center text-mine-shaft-400 text-xs">
//                 <IconClockHour3  mt={20}className="h-5 w-5 mr-1" stroke={1} />
//                 5 days ago
//             </div>
//             </div>
//     </div>
// }

// export default NGOCard;





function NGOCard({ ngo }) {
  return (
    <div className="bg-mine-shaft-900 p-4 w-72 m-2 mt-5 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <IconUserSquare className="h-7 text-bright-sun-400" stroke={2} />
          </div>
          <div>
            <div className="text-mine-shaft-200 font-semibold">{ngo.Name}</div>
            <div className="text-mine-shaft-300 text-xs">{ngo.location}</div>
          </div>
        </div>
        <IconBookmark className="text-mine-shaft-200 cursor-pointer" stroke={2} />
      </div>
      
      <div className="text-mine-shaft-200 mt-2">
        <TextInput
          variant="unstyled"
          label="Donation Amount"
          placeholder="Enter amount"
          styles={{
            input: {
              color: "white",
            },
          }}
        />
      </div>
      
      <div className="text-mine-shaft-100 text-sm">
        <span className="font-semibold text-bright-sun-400">Goal: </span>₹{ngo.Goal}
      </div>
      
      <div>
        <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
          {ngo.description}
        </Text>
      </div>
      
      <Divider mt={8} size="xs" mx="" color="#5a5a5a" />

      <div className="flex gap-20 justify-between items-center ">
        {/* <Button mt={7} variant="filled" color="yellow" radius="md">Donate</Button> */}

        <div className="overflow-visible">
       <Button mt={7} variant="light" color="brightSun.4" radius="md">Donate</Button>
        </div>

        <div className="flex items-center text-mine-shaft-400 text-xs">
          <IconClockHour3 className="h-5 w-5 mr-1" stroke={1} />
          {new Date(ngo.createdAt).toDateString()} {/* Format date */}
        </div>
      </div>
    </div>
  );
}

export default NGOCard;


