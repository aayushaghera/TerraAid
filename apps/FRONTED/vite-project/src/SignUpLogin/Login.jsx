// import { TextInput } from '@mantine/core';
// import { IconAt } from '@tabler/icons-react';
// import { PasswordInput } from '@mantine/core';
// import { IconLock } from '@tabler/icons-react';
// import { Checkbox } from '@mantine/core';
// import { Button } from '@mantine/core';
// import { Link } from 'react-router-dom';

// function Login()
// {
//     return <div className=" w-1/2 px-20 flex flex-col justify-center gap-3">
//     <div className="text-2xl">Create Account</div>

//     <TextInput withAsterisk
//     leftSection={  <IconAt size={16} />}
//     label="Email"
//     placeholder="Your email"
//     classNames={{
//         input: "border focus:border-bright-sun-400 ",
//     }}
//     />

//     <PasswordInput
//     withAsterisk
//     leftSection={<IconLock size={18} stroke={1.5} />}
//     label="Password"
//     placeholder="Password"
//     classNames={{
//         input: "border focus:border-bright-sun-400",
//     }}
//     />

//     <Button  variant="filled" color="yellow">SignUp</Button>

//     <div className='mx-auto'> Don't Have an account ? <Link to="/SignUp" className='text-bright-sun-400'>SignUp</Link></div>

    
    

// </div>

// }
// export default Login;

import { useState } from "react";
import { TextInput, PasswordInput, Button, Radio } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

function Login() {
  // State to track whether the user is logging in as a Donor or Organization
  const [userType, setUserType] = useState("donor");

  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = userType === "donor" ? "/user/donor-login" : "/admin/organization-login";

    try {
      const response = await fetch(`http://localhost:1200${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Login response:", data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl text-semibold">Login</div>

      {/* Radio buttons to choose Donor or Organization */}
      

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <TextInput
          withAsterisk
          leftSection={<IconAt size={16} />}
          label="Email"
          placeholder="Your email"
          name="email"
          onChange={handleChange}
          classNames={{ input: "border focus:border-bright-sun-400" }}
        />

        <PasswordInput
          withAsterisk
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          classNames={{ input: "border focus:border-bright-sun-400" }}
        />

       <Radio.Group value={userType} onChange={setUserType} className=" mt-4">
       <Radio value="donor" label="Donor" color="brightSun.4" className="inline-flex items-center mr-6" />
       <Radio value="organization" label="Organization" color="brightSun.4" className="inline-flex items-center" />
       </Radio.Group>

        <Button type="submit" variant="filled" color="yellow" className="mt-3">
          Login as {userType === "donor" ? "Donor" : "Organization"}
        </Button>
      </form>

      <div className="mx-auto">
        Don't have an account? <Link to="/SignUp" className="text-bright-sun-400">SignUp</Link>
      </div>
    </div>
  );
}

export default Login;
