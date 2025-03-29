// import { TextInput } from '@mantine/core';
// import { IconSearch } from '@tabler/icons-react';

// function LandPage() {
//     return (
//         <div className="flex items-center px-20">
               
           
//             <div className="flex flex-col w-[45%] gap-3 mt-40"> 
//                 <div className="text-6xl font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400 leading-tight">
//                     Empowering<span> Communities,</span> Changing Lives"
//                 </div>

//                 <div className="text-lg text-mine-shaft-200">
//                     Driving Change, Spreading Hope, and Creating a Brighter Tomorrow
//                 </div>

//                 <div className='flex gap-3 mt-5'>
//                 <TextInput className = 'bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100' variant="unstyled"  label="NGO Name" placeholder=""/>

//                 <TextInput className = 'bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100' variant="unstyled"  label="Location" placeholder=""/>

//                 <div className='items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover:bg-bright-sun-500 cursor-pointer'>
//                 <IconSearch className='h-[85%] w-[85%]' stroke={2} />
//                 </div>
//                 </div>
                
//             </div>

            
//             <div className="w-[55%] flex items-center justify-center mt-20">
//                 <div className="w-[30rem]">
//                     <img src="/NGO (2).png" alt="NGO" className="w-[30rem] scale-150"/>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LandPage;

// import { TextInput } from '@mantine/core';
// import { IconSearch, IconProgressHelp } from '@tabler/icons-react';

// function LandPage() {
//     return (
//         <div className="flex items-center px-20">
            
//             {/* Top Left Section */}
//             <div className="absolute top-5 left-5 flex gap-3 items-center text-bright-sun-400">
//                 <IconProgressHelp className="h-8 w-8" stroke={2} />
//                 <div className="text-2xl font-semibold">TerraAid</div> 
//             </div>

//             <div className="flex flex-col w-[45%] gap-3 mt-40"> 
//                 <div className="text-6xl font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400 leading-tight">
//                     Empowering<span> Communities,</span> Changing Lives
//                 </div>

//                 <div className="text-lg text-mine-shaft-200">
//                     Driving Change, Spreading Hope, and Creating a Brighter Tomorrow
//                 </div>

//                 <div className="flex gap-3 mt-5">
//                     <TextInput 
//                         className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100" 
//                         variant="unstyled"  
//                         label="NGO Name" 
//                         placeholder=""
//                     />

//                     <TextInput 
//                         className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100" 
//                         variant="unstyled"  
//                         label="Location" 
//                         placeholder=""
//                     />

//                     <div className="items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover:bg-bright-sun-500 cursor-pointer">
//                         <IconSearch className="h-[85%] w-[85%]" stroke={2} />
//                     </div>
//                 </div>
//             </div>

//             <div className="w-[55%] flex items-center justify-center mt-20">
//                 <div className="w-[30rem]">
//                     <img src="/NGO (2).png" alt="NGO" className="w-[30rem] scale-150"/>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LandPage;


import { TextInput } from '@mantine/core';
import { IconSearch, IconProgressHelp } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

function LandPage() {
    return (
        <div className="flex items-center px-20 relative">
            
            {/* Top Left Section */}
            <div className="absolute top-7 left-10 flex gap-3 items-center text-bright-sun-400">
                <IconProgressHelp className="h-8 w-8" stroke={2} />
                <div className="text-3xl font-semibold">TerraAid</div> 
            </div>

            {/* Top Right Section (SignUp Link) */}
            <div className="absolute top-7 right-10">
                <Link to="/SignUp" className="text-bright-sun-400 text-md font-semibold hover:text-bright-sun-300 transition duration-200">
                    SignUp
                </Link>
            </div>

            <div className="flex flex-col w-[45%] gap-3 mt-40"> 
                <div className="text-6xl font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400 leading-tight">
                    Empowering<span> Communities,</span> Changing Lives
                </div>

                <div className="text-lg text-mine-shaft-200">
                    Driving Change, Spreading Hope, and Creating a Brighter Tomorrow
                </div>

                <div className="flex gap-3 mt-5">
                    <TextInput 
                        className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100" 
                        variant="unstyled"  
                        label="NGO Name" 
                        placeholder=""
                    />

                    <TextInput 
                        className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100" 
                        variant="unstyled"  
                        label="Location" 
                        placeholder=""
                    />

                    <div className="items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover:bg-bright-sun-500 cursor-pointer">
                        <IconSearch className="h-[85%] w-[85%]" stroke={2} />
                    </div>
                </div>
            </div>

            <div className="w-[55%] flex items-center justify-center mt-20">
                <div className="w-[30rem]">
                    <img src="/NGO (2).png" alt="NGO" className="w-[30rem] scale-150"/>
                </div>
            </div>
        </div>
    );
}

export default LandPage;
