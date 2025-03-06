
import { useLocation } from 'react-router-dom';
import Login from '../SignUpLogin/Login';
import SignUp from '../SignUpLogin/SignUp';
import { IconProgressHelp } from '@tabler/icons-react';

function SignUpPage() {
    const location = useLocation()
    return (
        <div className="min-h-screen bg-mine-shaft-950 font-['Poppins'] overflow-hidden ">
            <div className={`min-h-screen transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${location.pathname == '/SignUp'?'-translate-x-1/2':'translate-x-0'}`}>
            {/* Left Section (Logo and Tagline) */}
            <Login></Login>
            <div className="w-1/2 flex flex-col items-center justify-center bg-mine-shaft-900 rounded-r-[200px]">
                <div className="flex gap-3 items-center text-bright-sun-400">
                    <IconProgressHelp className="h-20 w-20" stroke={2} />
                    <div className="text-7xl font-semibold">TerraAid</div>
                </div>
                <div className="text-2xl text-mine-shaft-200 mt-2">
                    Donate Today, Empower Tomorrow!
                </div>
            </div>
    
            {/* Right Section (SignUp Component) */}
          
                <SignUp />
            </div>
        </div>
    );
    
}

export default SignUpPage;
