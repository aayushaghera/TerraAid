
import { useState } from "react";
import { TextInput, PasswordInput, Button, Radio } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { IconArrowLeft } from '@tabler/icons-react';

function Login() {
  const [userType, setUserType] = useState("donor");
  const [message, setMessage] = useState(""); // Message state
  const [messageType, setMessageType] = useState(null); // Initialize properly
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = userType === "donor" ? "/user/donor-login" : userType === "organization" ? "/admin/organization-login" : "/Administrator/login";


    try {
      const response = await fetch(`http://localhost:1200${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Login response:", data);

  if (response.ok) {
    // ✅ Store token and userType
    localStorage.setItem("token", data.token);
    localStorage.setItem("userType", userType);

    if (userType === "donor") {
      localStorage.setItem("donor", JSON.stringify({ name: data.name, email: data.email }));
    } else if (userType === "organization") {
      localStorage.setItem("organization", JSON.stringify({ name: data.name, email: data.email }));
    } else {
      localStorage.setItem("administrator", JSON.stringify({ name: data.name, email: data.email }));
    }
    console.log("Stored data:", localStorage.getItem(userType === "donor" ? "donor" : userType === "organization" ? "organization" : "Administrator"));


    setMessage("Login successful!");
    setMessageType("success");

    // ✅ Navigate based on userType
    setTimeout(() => {
      if (userType === "donor") {
        navigate("/Causes"); // 🔹 Donors go to /Causes
      } else if (userType === "organization") {
        navigate("/CreatePost"); // 🔹 Organizations go to /CreatePost
      } else {
        navigate("/Admin"); // 🔹 Administrators go to /AdminDashboard
      }
    }, 1500);
    
  } else {
    setMessage(data.message || "Login failed. Please try again.");
    setMessageType("error");
  }
} catch (error) {
  console.error("Error logging in:", error);
  setMessage("An error occurred. Please try again.");
  setMessageType("error");
}
};

  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
       <div className="absolute top-6 left-4">
       <Link to="/">
         <Button leftSection={<IconArrowLeft stroke={2} />} color="brightSun.4" variant="light">Home</Button>
         </Link>
       </div>

      <div className="text-2xl font-semibold">Login</div>

      {/* Message Box */}
      {message && messageType && (
        <div className={`p-2 rounded-md text-center ${messageType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {message}
        </div>
      )}

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
       <Radio value="organization" label="Organization" color="brightSun.4" className="inline-flex items-center mr-6" />
       <Radio value="Admin" label="Admin" color="brightSun.4" className="inline-flex items-center" />
       </Radio.Group>

        <Button type="submit" variant="filled" color="yellow" className="mt-3">
        Login as {userType === "donor" ? "Donor" : userType === "organization" ? "Organization" : "Administrator"}
        </Button>
      </form>

      <div className="mx-auto">
        Don't have an account? <Link to="/SignUp" className="text-bright-sun-400">SignUp</Link>
      </div>
    </div>
  );
}

export default Login;
