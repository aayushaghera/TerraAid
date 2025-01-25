import React, { useState } from "react";

const App = () => {
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
    <div className="container">
      <h1 className="title">Donate to a Cause</h1>
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
      </button>
    </div>
  );
};

export default App;
