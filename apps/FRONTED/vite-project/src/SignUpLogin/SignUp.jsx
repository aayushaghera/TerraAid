// import { TextInput } from '@mantine/core';
// import { IconAt } from '@tabler/icons-react';
// import { PasswordInput } from '@mantine/core';
// import { IconLock } from '@tabler/icons-react';
// import { Checkbox } from '@mantine/core';
// import { Button } from '@mantine/core';
// import { Link } from 'react-router-dom';

// function SignUp()
// {
//    return <div className=" w-1/2 px-20 flex flex-col justify-center gap-3">
//         <div className="text-2xl">Create Account</div>
//         <TextInput withAsterisk
//         label="Organization Name"
//         placeholder="Organization Name"
//         classNames={{
//             input: "border focus:border-bright-sun-400 ",
//         }}
//         />

//         <TextInput withAsterisk
//         leftSection={  <IconAt size={16} />}
//         label="Email"
//         placeholder="Your email"
//         classNames={{
//             input: "border focus:border-bright-sun-400 ",
//         }}
//         />

//         <PasswordInput
//         withAsterisk
//         leftSection={<IconLock size={18} stroke={1.5} />}
//         label="Password"
//         placeholder="Password"
//         classNames={{
//             input: "border focus:border-bright-sun-400",
//         }}
//         />

//         <PasswordInput
//         withAsterisk
//         leftSection={<IconLock size={18} stroke={1.5} />}
//         label=" Confirm Password"
//         placeholder=" Confirm Password"
//         />

//         <Checkbox
//         label="I accept terms & condition"
//         color="yellow"
//         />

//         <Button  variant="filled" color="yellow">SignUp</Button>

//         <div className='mx-auto'>Have an account ? <Link to="/Login" className='text-bright-sun-400'>Login</Link></div>

        
        

//    </div>
// }

// export default SignUp;





import { useState } from "react";
import { TextInput, PasswordInput, Checkbox, Button, Radio } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

function SignUp() {
  // State to track whether the user is signing up as a Donor or Organization
  const [userType, setUserType] = useState("organization");

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pan: "", // Only used for donors
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = userType === "donor" ? "/user/donor-signup" : "/admin/organization-signup";

    try {
      const response = await fetch(`http://localhost:1200${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Signup response:", data);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl">Create Account</div>

      <form onSubmit={handleSubmit}className="flex flex-col gap-3">
        <TextInput
          withAsterisk
          label={userType === "donor" ? "Donor Name" : "Organization Name"}
          placeholder={userType === "donor" ? "Donor Name" : "Organization Name"}
          name="name"
          onChange={handleChange}
          classNames={{ input: "border focus:border-bright-sun-400" }}
        />

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

        <PasswordInput
          withAsterisk
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
        />

        {/* PAN for Donors, Aadhar for Organizations */}
        {userType === "donor" && (
          <TextInput
            withAsterisk
            label="PAN Number"
            placeholder="PAN Number"
            name="pan"
            onChange={handleChange}
          />
        )}

       {/* Radio buttons to choose Donor or Organization */}
       
       <Radio.Group value={userType} onChange={setUserType} className=" mt-4">
       <Radio value="donor" label="Donor" color="brightSun.4" className="inline-flex items-center mr-6" />
       <Radio value="organization" label="Organization" color="brightSun.4" className="inline-flex items-center" />
       </Radio.Group>

        <Button type="submit" variant="filled" color="yellow" className="mt-3">
          Sign Up as {userType === "donor" ? "Donor" : "Organization"}
        </Button>
      </form>

      <div className="mx-auto">
        Have an account? <Link to="/Login" className="text-bright-sun-400">Login</Link>
      </div>
    </div>
  );
}

export default SignUp;
