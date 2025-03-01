import { IconMail } from '@tabler/icons-react';

function Profile()
{
    
    return (
        <div className="">
          {/* Background Image Wrapper */}
          <div className="m-5 relative">
            <img src="BackGround_img.png" className="w-full h-full object-cover rounded-t-2xl" alt="Background" />
            
            {/* Avatar */}
            <div className="absolute left-3 bottom-[-4rem]">
              <img src="avatar.png" className="w-48 h-48 rounded-full border-8 border-mine-shaft-950" alt="Avatar" />
            </div>
          </div>
      
          {/* Name Below Avatar */}
          <div className="px-4 mt-20 m-5 text-mine-shaft-200"> {/* Increased margin-top to mt-24 */}
            <div className="text-lg font-semibold">Aayush Aghera</div>

            <div className="text-sm flex items-center gap-2">
           <IconMail stroke={2} size={16} /> {/* Icon with stroke width and size */}
           <span>aayushaghera@gmail.com</span>
           </div>
           
          </div>
        </div>
      );
      
}
export default Profile;