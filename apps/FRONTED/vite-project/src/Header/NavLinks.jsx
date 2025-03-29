// import { Link, useLocation } from "react-router-dom";

// function NavLinks()
// {
//     const links =[
//         { name:"CreatePost",url:"/CreatePost"},
//         { name:"Causes",url:"/Causes"},
//         { name:"Mission",url:"/mission"},
//         { name:"About",url:"/About"},
//         { name:"Contact",url:"/Contact"},
//         { name:"Dashboard",url:"/Dashboard"},
//         { name:"SignUp",url:"/SignUp"}

//     ]
//     const location = useLocation();
    
// //     return (
// //         <div className="flex gap-5 items-center text-mine-shaft-300 h-full">
// //             {
// //                 links.map((link, index) => (
// //                     <div key={index} className={`${location.pathname===link.url?"border-bright-sun-400 text-bright-sun-400":"border-transparnet"}border-t-[3px] h-full flex items-center`}> 
// //                         <Link to={link.url}>
// //                             {link.name}
// //                         </Link>
// //                     </div>  
// //                 ))
// //             }
    
// //     </div>
// //     )
// // }


// return (
//     <div className="flex gap-5 items-center text-mine-shaft-300 h-full">
//         {
//             links.map((link, index) => (
//                 <div 
//                     key={index} 
//                     className={`${location.pathname === link.url ? 
//                         "border-bright-sun-400 text-bright-sun-400" : 
//                         "border-transparent"} border-t-[3px] h-full flex items-center`}
//                 > 
//                     <Link to={link.url}>
//                         {link.name}
//                     </Link>
//                 </div>  
//             ))
//         }
//     </div>
// );
// }

// export default NavLinks;


import { Link, useLocation } from "react-router-dom";

function NavLinks() {
    const location = useLocation();

    // ✅ Get userType from localStorage (Default: "donor")
    const userType = localStorage.getItem("userType") || "donor";

    // ✅ Links for donor & organization
    const donorLinks = [
        { name: "Causes", url: "/Causes" },
        // { name: "Mission", url: "/mission" },
        // { name: "About", url: "/About" },
        { name: "Contact", url: "/Contact" },
        { name: "Dashboard", url: "/Dashboard" },
        // { name: "SignUp", url: "/SignUp" },
        // { name: "HomePage", url: "/HomePage" }
    ];

    const organizationLinks = [
        { name: "CreatePost", url: "/CreatePost" },
        { name: "Causes", url: "/Causes" },
        // { name: "Mission", url: "/mission" },
        // { name: "About", url: "/About" },
        { name: "Contact", url: "/Contact" },
        // { name: "SignUp", url: "/SignUp" },
        // { name: "HomePage", url: "/HomePage" }
    ];

    // ✅ Select the correct set of links based on userType
    const links = userType === "donor" ? donorLinks : organizationLinks;

    return (
        <div className="flex gap-5 items-center text-mine-shaft-300 h-full">
            {links.map((link, index) => (
                <div 
                    key={index} 
                    className={`${location.pathname === link.url ? 
                        "border-bright-sun-400 text-bright-sun-400" : 
                        "border-transparent"} border-t-[3px] h-full flex items-center`}
                > 
                    <Link to={link.url}>
                        {link.name}
                    </Link>
                </div>  
            ))}
        </div>
    );
}

export default NavLinks;
