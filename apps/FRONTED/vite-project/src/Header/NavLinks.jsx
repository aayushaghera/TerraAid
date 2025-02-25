import { Link, useLocation } from "react-router-dom";

function NavLinks()
{
    const links =[
        { name:"CreatePost",url:"/CreatePost"},
        { name:"Causes",url:"/Causes"},
        { name:"Mission",url:"/mission"},
        { name:"About",url:"/About"},
        { name:"Contact",url:"/Contact"},
        { name:"Dashboard",url:"/Dashboard"}

    ]
    const location = useLocation();
    
//     return (
//         <div className="flex gap-5 items-center text-mine-shaft-300 h-full">
//             {
//                 links.map((link, index) => (
//                     <div key={index} className={`${location.pathname===link.url?"border-bright-sun-400 text-bright-sun-400":"border-transparnet"}border-t-[3px] h-full flex items-center`}> 
//                         <Link to={link.url}>
//                             {link.name}
//                         </Link>
//                     </div>  
//                 ))
//             }
    
//     </div>
//     )
// }


return (
    <div className="flex gap-5 items-center text-mine-shaft-300 h-full">
        {
            links.map((link, index) => (
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
            ))
        }
    </div>
);
}

export default NavLinks;