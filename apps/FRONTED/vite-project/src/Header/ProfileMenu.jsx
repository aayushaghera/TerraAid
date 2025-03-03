import { Menu, Text } from "@mantine/core";
import { Avatar} from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';
import { IconMoon } from '@tabler/icons-react';
import { Switch } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { IconLogout2 } from '@tabler/icons-react';
import { useState } from "react";

import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

function ProfileMenu () {
    const [checked, setChecked] = useState(false);
    const [opened, setOpened] = useState(false);

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        {/* <Button>Toggle menu</Button> */}
        <div className='flex items-center gap-2 cursor-pointer'>
            <div>aayush</div>  
            <Avatar src='avatar.png'></Avatar>
            </div>
      </Menu.Target>

      <Menu.Dropdown onChange={()=>setOpened(true)}>
        <Link to = "/UserProfile">
        <Menu.Item leftSection={<IconUserCircle stroke={2} size={17} />}>
          Profile
        </Menu.Item>
        </Link>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item
        leftSection={<IconMoon stroke={2} size ={17}/>}
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
        <Menu.Item color="red" leftSection={<IconLogout2 stroke={2} size={17} />}>
          Logout my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
