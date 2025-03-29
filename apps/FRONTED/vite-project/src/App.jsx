import React, { useState } from "react";
import '@mantine/tiptap/styles.css';
import '@mantine/dropzone/styles.css';
import ProtectedRoute from "./ProtectedRoute"; 
import HomePage from "./Pages/HomePage";
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Causes from "./Pages/Causes";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import UserProfile from "./Pages/UserProfile";
import CreatePost from "./Pages/CreatePost";
import SignUpPage from "./Pages/SignUpPage";
import Dashboard from "./Pages/Dashboard";
import NGODetails from "./Pages/NGODetails";
import AdminPanel from "./Pages/AdminPanel";
import Contact from "./Pages/Contact";


const App = () => {

  const theme = {
  colors: {
    brightSun: [
      "#fffbeb", "#fff3c6", "#ffe588", "#ffd149", "#ffbd20",
      "#f99b87", "#dd7382", "#b75006", "#943c0c", "#7a330d"
    ],
    mineShaft: [
      "#f6f6f6", "#e7e7e7", "#d1d1d1", "#b0bebe", "#888888",
      "#6d6d6d", "#5d5d5d", "#4f4f4f", "#454545", "#3d3d3d", "#2d2d2d"
    ],
  },
  fontFamily: "Poppins, sans-serif",
};
  
  const [amount, setAmount] = useState("");

  const checkoutHandler = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    try {
      // Fetch the Razorpay key
      // const keyResponse = await fetch("http://localhost:1200/api/getkey");
      // const keyData = await keyResponse.json();
    
      // Create an order
      const orderResponse = await fetch("http://localhost:1200/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
      const orderData = await orderResponse.json();
       
       
      console.log(orderData);

      const options = {
        //key: keyData.key,
        amount: orderData.order.amount,
        currency: "INR",
        name: "NGO",
        description: "Support a cause",
        order_id: orderData.order.id,
        callback_url: "http://localhost:1200/api/paymentverification",
        prefill: {
          name: "Donor",
          email: "donor@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#121212",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error( error);
    }
  };

  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
    <div className="container">
    <BrowserRouter>
    <Header></Header>
    <Routes>
      {/* <h1 className="title">Donate to a Cause</h1>
      <input
        type="text"
        placeholder="Enter amount in INR"
        value={amount}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*$/.test(value)) {
            setAmount(value);
          }
        }}
      />
      <button onClick={checkoutHandler} className="donate-button">
        Donate
      </button> */}
      {/* <Route path="/" element={<HomePage />}></Route>
      <Route path="/Causes" element={<Causes></Causes>}></Route>
      <Route path="/UserProfile" element ={<UserProfile></UserProfile>}></Route>
      <Route path="/CreatePost"  element ={<CreatePost></CreatePost>}></Route>
      <Route path="/SignUp" element = {<SignUpPage></SignUpPage>}></Route>
      <Route path="/Login" element = {<SignUpPage></SignUpPage>}></Route>
      <Route path="/Dashboard" element = {<Dashboard></Dashboard>}></Route>
      <Route path="/ngo/:id" element={<NGODetails />} /> 
      <Route path="/admin" element={<AdminPanel />} />  */}
     
  <Route path="/" element={<HomePage />} />
  <Route path="/Causes" element={<ProtectedRoute element={<Causes />}  allowedRoles={["donor"]} />} />
  <Route path="/UserProfile" element={<ProtectedRoute element={<UserProfile />} allowedRoles={["donor", "organization", "admin"]} />} />
  <Route path="/CreatePost" element={<ProtectedRoute element={<CreatePost />} allowedRoles={["organization"]} />} />
  <Route path="/Dashboard" element={<ProtectedRoute element={<Dashboard />} allowedRoles={["donor", "organization", "admin"]} />} />
  <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} allowedRoles={["admin"]} />} />
  <Route path="/ngo/:id" element={<NGODetails />} /> {/* Public route */}
  <Route path ="/Contact" element = {<Contact></Contact>}/>
  <Route path="/SignUp" element={<SignUpPage />} />
  <Route path="/Login" element={<SignUpPage />} />

      {/* <Route path="*" element={<HomePage></HomePage>}></Route> */}
      </Routes>
       <Footer></Footer>
      </BrowserRouter>  
    </div>
    </MantineProvider>
  );
};

export default App;
