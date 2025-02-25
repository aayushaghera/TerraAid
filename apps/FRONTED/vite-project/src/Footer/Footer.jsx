import { IconProgressHelp } from '@tabler/icons-react';
import { IconBrandFacebook } from '@tabler/icons-react';
import { IconBrandInstagram } from '@tabler/icons-react';
import { IconBrandX } from '@tabler/icons-react';

function Footer() {
    return (
        <div className="pt-20 pb-5  flex flex-wrap gap-10 bg-mine-shaft-950 font-['Poppins'] ">
            {/* TerraAid Section */}
            <div className="w-1/4 flex-col gap-7 mx-9">
                <div className="flex gap-1 items-center text-bright-sun-400">
                    <IconProgressHelp className="h-8 w-8" stroke={2} />
                    <div className="text-2xl font-semibold">TerraAid</div>
                </div>
                <div className="text-sm text-mine-shaft-300 mt-4">
                    A platform connecting donors to vital causes like education and healthcare. Donate securely and make a real impact.
                </div>
                <div className="flex gap-3 mt-3 text-bright-sun-400 [&>div]:bg-mine-shaft-900 [&>div]:p-2 [&>div]:rounded-full [&>div]:cursor-pointer">
                    <div><IconBrandFacebook stroke={2} /></div>
                    <div><IconBrandInstagram stroke={2} /></div>
                    <div><IconBrandX stroke={2} /></div>
                </div>
            </div>
            
            <div className='flex gap-10 mx-12'>
                {/* Company Section */}
                <div className="w-1/4 min-w-[200px] mx-12">
                    <h3 className="text-lg font-semibold text-bright-sun-400">Company</h3>
                    <ul className="mt-3 space-y-2 text-mine-shaft-300  text-sm">
                        <li className="hover:text-white cursor-pointer">About Us</li>
                        <li className="hover:text-white cursor-pointer">Our Impact</li>
                        <li className="hover:text-white cursor-pointer">Partners</li>
                    </ul>
                </div>

                {/* Contact Us Section */}
                <div className="w-1/4 min-w-[200px] mx-8">
                    <h3 className="text-lg font-semibold text-bright-sun-400">Contact Us</h3>
                    <ul className="mt-3 space-y-2 text-mine-shaft-300 text-sm">
                        <li className="hover:text-white cursor-pointer">Contact Support</li>
                        <li className="hover:text-white cursor-pointer">Feedback</li>
                        <li className="hover:text-white cursor-pointer">FAQs</li>
                    </ul>
                </div>

                {/* Privacy & Policy Section */}
                <div className="w-1/4 min-w-[200px] mx-11">
                    <h3 className="text-lg font-semibold text-bright-sun-400">Privacy & Policy</h3>
                    <ul className="mt-3 space-y-2 text-mine-shaft-300 text-sm">
                        <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                        <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
                        <li className="hover:text-white cursor-pointer">Donate Safely</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;

