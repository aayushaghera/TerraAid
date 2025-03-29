
// import { Menu } from "@mantine/core";
// import { Avatar, Switch } from '@mantine/core';
// import { IconUserCircle, IconMoon, IconSun, IconMoonStars, IconLogout2, IconMessageCircle } from '@tabler/icons-react';
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function ProfileMenu () {
//     const [checked, setChecked] = useState(false);
//     const [opened, setOpened] = useState(false);
//     const [donor, setDonor] = useState({ name: "", email: "" });

//     // Fetch donor details from localStorage
//     useEffect(() => {
//       const donorData = localStorage.getItem("donor");
//       if (donorData) {
//         try {
//           const storedDonor = JSON.parse(donorData);
//           setDonor(storedDonor);
//         } catch (error) {
//           console.error("Error parsing donor data:", error);
//         }
//       }
//     }, []);

//   return (
//     <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
//       <Menu.Target>
//         <div className='flex items-center gap-2 cursor-pointer'>
//           <div>{donor.name || "Guest"}</div>  
//           <Avatar src='avatar.png'></Avatar>
//         </div>
//       </Menu.Target>

//       <Menu.Dropdown>
//         <Link to="/UserProfile">
//           <Menu.Item leftSection={<IconUserCircle stroke={2} size={17} />}>
//             Profile
//           </Menu.Item>
//         </Link>
//         <Menu.Item leftSection={<IconMessageCircle size={14} />}>
//           Messages
//         </Menu.Item>
//         <Menu.Item
//           leftSection={<IconMoon stroke={2} size={17} />}
//           rightSection={
//             <Switch
//               checked={checked}
//               onChange={(event) => setChecked(event.currentTarget.checked)}
//               size="md"
//               color="dark.4"
//               onLabel={<IconSun size={16} stroke={2.5} color="yellow" />}
//               offLabel={<IconMoonStars size={16} stroke={2.5} color="cyan" />}
//             />
//           }>
//           Darkmode
//         </Menu.Item>

//         <Menu.Divider />
//         <Menu.Item color="red" leftSection={<IconLogout2 stroke={2} size={17} />}>
//           Logout my account
//         </Menu.Item>
//       </Menu.Dropdown>
//     </Menu>
//   );
// };

// export default ProfileMenu;

import { Menu, Avatar, Switch } from "@mantine/core";
import { IconUserCircle, IconMoon, IconSun, IconMoonStars, IconLogout2, IconMessageCircle } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProfileMenu() {
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", userType: "" });
  const navigate = useNavigate();

  // Fetch user details from localStorage
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    let userData = null;

    if (userType === "donor") {
      userData = localStorage.getItem("donor");
    } else if (userType === "organization") {
      userData = localStorage.getItem("organization");
    } else if (userType === "Admin") {  // ✅ Check for Admin
      userData = localStorage.getItem("administrator");
    }

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser({ ...parsedUser, userType });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // 🔴 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");       // Remove auth token
    localStorage.removeItem("userType");    // Remove user type
    localStorage.removeItem("donor");       // Remove donor data
    localStorage.removeItem("organization");// Remove organization data

    navigate("/Login"); // Redirect to Login Page
  };

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="flex items-center gap-2 cursor-pointer">
          <div>{user.name || "Guest"}</div>
          <Avatar src="avatar.png"></Avatar>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Link to="/UserProfile">
          <Menu.Item leftSection={<IconUserCircle stroke={2} size={17} />}>
            Profile
          </Menu.Item>
        </Link>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoon stroke={2} size={17} />}
          rightSection={
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              size="md"
              color="dark.4"
              onLabel={<IconSun size={16} stroke={2.5} color="yellow" />}
              offLabel={<IconMoonStars size={16} stroke={2.5} color="cyan" />}
            />
          }>
          Darkmode
        </Menu.Item>

        <Menu.Divider />

        {/* 🔴 Logout Button */}
        <Menu.Item color="red" leftSection={<IconLogout2 stroke={2} size={17} />} onClick={handleLogout}>
          Logout my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileMenu;
