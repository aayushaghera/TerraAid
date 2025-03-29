import NGOCategory from "../LandingPage/NGOCategory";
import Header from "../Header/Header";
import LandPage from "../LandingPage/LandPage";
import Working from "../LandingPage/Working";
import Testimonials from "../LandingPage/Testimonials";
import Footer from "../Footer/Footer";

import { IconProgressHelp } from '@tabler/icons-react';

function HomePage()
{
      return(
        <div className="min-h-screen bg-mine-shaft-950 font-['Poppins']">


            {/* //<Header></Header> */}
            <LandPage></LandPage>
            <NGOCategory></NGOCategory>
            <Working></Working>
            <Testimonials></Testimonials>
            {/* <Footer></Footer> */}
        </div>
      )
}

export default HomePage;