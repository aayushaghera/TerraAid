
// import { useNavigate } from "react-router-dom"; // Import navigation
// import { IconUserSquare, IconBookmark, IconClockHour3 } from "@tabler/icons-react";
// import { TextInput, Text, Divider, Button } from "@mantine/core";
// import { useState, useEffect } from "react";

// function NGOCard({ ngo }) {
//   const [amount, setAmount] = useState("");
//   const [donor, setDonor] = useState({ name: "", email: "" });
//   const navigate = useNavigate(); // Hook for navigation

//   // Fetch donor details from localStorage
//   useEffect(() => {
//     const donorData = localStorage.getItem("donor");
//     if (donorData) {
//       try {
//         const storedDonor = JSON.parse(donorData);
//         setDonor(storedDonor);
//       } catch (error) {
//         console.error("Error parsing donor data:", error);
//       }
//     }
//   }, []);

//   const checkoutHandler = async () => {
//     if (!amount || isNaN(amount) || Number(amount) <= 0) {
//       alert("Please enter a valid amount!");
//       return;
//     }

//     try {
//       // Send donation details to backend after successful payment
//       await fetch("http://localhost:1200/Administrator/save-donation", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ngoId: ngo._id,  
//           ngoName: ngo.Name,  
//           amount: Number(amount),
//         }),
//     });
    
//     } catch (error) {
//       console.error("Error saving donation:", error);
//     }

//     console.log("Sending donation data:", {
//       ngoId: ngo._id, 
//       ngoName: ngo.Name,
//       donorEmail: donor.email,
//       donorName: donor.name,
//       amount: Number(amount),
//     });
    

//     try {
//       // Send donation details to the NEW API endpoint
//       await fetch("http://localhost:1200/Administrator/save-donation-record", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ngoId: ngo._id,
//           ngoName: ngo.Name,
//           donorEmail: donor.email,
//           donorName: donor.name,
//           amount: Number(amount),
//         }),
//       });
//     } catch (error) {
//       console.error("Error storing donation record:", error);
//     }
  

//     try {
//       const orderResponse = await fetch("http://localhost:1200/api/checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount }),
//       });

//       const orderData = await orderResponse.json();

//       const options = {
//         amount: orderData.order.amount,
//         currency: "INR",
//         name: ngo.Name,
//         description: "Support a cause",
//         order_id: orderData.order.id,
//         callback_url: "http://localhost:1200/api/paymentverification",
//         prefill: { name: donor.name, email: donor.email, contact: "9999999999" },
//         theme: { color: "#121212" },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div 
//       className="bg-mine-shaft-900 p-4 w-72 m-2 mt-5 flex flex-col gap-2 cursor-pointer"
//       // onClick={() => navigate(`/ngo/${ngo._id}`)} // Navigate to details page
//     >
//       <div className="flex justify-between">
//         <div className="flex gap-2 items-center">
//           <div className="p-2 bg-mine-shaft-800 rounded-md">
//             <IconUserSquare className="h-7 text-bright-sun-400" stroke={2} />
//           </div>
//           <div>
//             <div onClick={() => navigate(`/ngo/${ngo._id}`)} className="text-mine-shaft-200 font-semibold ">{ngo.Name}  </div>
//             <div className="text-mine-shaft-300 text-xs">{ngo.location}</div>
//           </div>
//         </div>
//         <IconBookmark className="text-mine-shaft-200 cursor-pointer" stroke={2} />
//       </div>

//       <div className="text-mine-shaft-200 mt-2">
//         <TextInput
//           variant="unstyled"
//           label="Donation Amount"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => {
//             const value = e.target.value;
//             if (/^\d*$/.test(value)) setAmount(value);
//           }}
//           styles={{ input: { color: "white" } }}
//         />
//       </div>

//       <div className="text-mine-shaft-100 text-sm">
//         <span className="font-semibold text-bright-sun-400">Goal: </span>₹{ngo.Goal}
//       </div>

//       <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
//         {ngo.description}
//       </Text>

//       <Divider mt={8} size="xs" mx="" color="#5a5a5a" />

//       <div className="overflow-visible flex gap-5 items-center">
//         <Button mt={7} variant="light" color="brightSun.4" radius="md" onClick={checkoutHandler}>
//           Donate
//         </Button>
//         <div className="flex items-center text-mine-shaft-400 text-xs">
//           <IconClockHour3 className="h-5 w-5 mr-1" stroke={1} />
//           {new Date(ngo.createdAt).toDateString()}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NGOCard;


import { useNavigate } from "react-router-dom";
import { IconUserSquare, IconBookmark, IconClockHour3 } from "@tabler/icons-react";
import { TextInput, Text, Divider, Button, Progress } from "@mantine/core";
import { useState, useEffect } from "react";

function NGOCard({ ngo }) {
  const [amount, setAmount] = useState("");
  const [donor, setDonor] = useState({ name: "", email: "" });
  const [ngoDetails, setNgoDetails] = useState(null);
  const [NGODetails, setNGODetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch NGO details
  useEffect(() => {
    const fetchNgoDetails = async () => {
      if (!ngo?._id) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:1200/Administrator/getFundRaiser/${ngo._id}`);
        if (!response.ok) throw new Error("Failed to fetch NGO data");
        const data = await response.json();
        setNgoDetails(data);

        const NGO = await fetch(`http://localhost:1200/Administrator/getNGOByPostId/${ngo._id}`);
        if (!response.ok) throw new Error("Failed to fetch NGO data");
        const datas = await NGO.json();
        setNGODetails(datas);

      } catch (error) {
        console.error("Error fetching NGO details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNgoDetails();
  }, [ngo?._id]);
  
  
  // Fetch donor details from localStorage
  useEffect(() => {
    const donorData = localStorage.getItem("donor");
    if (donorData) {
      try {
        const storedDonor = JSON.parse(donorData);
        setDonor(storedDonor);
      } catch (error) {
        console.error("Error parsing donor data:", error);
      }
    }
  }, []);

  const checkoutHandler = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    try {
      // Send donation details to backend
      await Promise.all([
        fetch("http://localhost:1200/Administrator/save-donation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ngoId: ngo._id,
            ngoName: ngo.Name,
            amount: Number(amount),
          }),
        }),
        fetch("http://localhost:1200/Administrator/save-donation-record", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ngoId: ngo._id,
            ngoName: ngo.Name,
            donorEmail: donor.email,
            donorName: donor.name,
            amount: Number(amount),
          }),
        }),
        fetch("http://localhost:1200/Administrator/save-Recipt",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ngoId: ngo._id,
            ngoName: ngo.Name,
            ngoEmail: NGODetails.email,
            ngoAcc: NGODetails.bankDetails.accountNumber,
            ngoISFC: NGODetails.bankDetails?.ifsc, 
            ngoGST: NGODetails.gst,
            street1: NGODetails.address?.street1,
            street2: NGODetails.address?.street1,
            city: NGODetails.address?.city ,
            state: NGODetails.address?.state ,
            postal_code: NGODetails.address?.postal_code ,
            donorEmail: donor.email,
            donorName: donor.name,
            amount: Number(amount),
          }),
        })
      ]);

      // Process payment
      const orderResponse = await fetch("http://localhost:1200/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const orderData = await orderResponse.json();
      const razor = new window.Razorpay({
        amount: orderData.order.amount,
        currency: "INR",
        name: ngo.Name,
        description: "Support a cause",
        order_id: orderData.order.id,
        callback_url: "http://localhost:1200/api/paymentverification",
        prefill: { name: donor.name, email: donor.email, contact: "9999999999" },
        theme: { color: "#121212" },
      });
      
      razor.open();
      setAmount(""); // Reset amount after donation
    } catch (error) {
      console.error("Donation error:", error);
      alert("An error occurred during donation. Please try again.");
    }
  };

  // ✅ Use raw number for percentage calculation
  const parseCurrency = (value) => {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    
    // Remove commas and convert to number
    const num = parseFloat(value.toString().replace(/,/g, ''));
    return isNaN(num) ? 0 : num;
  };
  
  // Then calculate percentage
  const progressPercentage = ngoDetails?.raisedAmount
  ? Math.min(100, Math.round((parseCurrency(ngoDetails.raisedAmount) / parseCurrency(ngo.Goal)) * 100))
  : 0;



  if (isLoading) {
    return <div className="bg-mine-shaft-900 p-4 w-72 m-2 mt-5 rounded-lg">Loading NGO details...</div>;
  }

   //✅ Hide the NGO card if raisedAmount is greater than or equal to Goal
  //  if (ngoDetails?.raisedAmount >= ngo.Goal) {
  //   return null;
  // }

  return (
    <div className="bg-mine-shaft-900 p-4 w-72 m-2 mt-5 flex flex-col gap-2 cursor-pointer shadow-md rounded-lg">
      {/* NGO Header */}
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <IconUserSquare className="h-7 text-bright-sun-400" stroke={2} />
          </div>
          <div>
            <div 
              onClick={() => navigate(`/ngo/${ngo._id}`)} 
              className="text-mine-shaft-200 font-semibold hover:text-bright-sun-400 transition-colors"
            >
              {ngo.Name}
            </div>
            <div className="text-mine-shaft-300 text-xs">{ngo.location}</div>
          </div>
        </div>
        <IconBookmark className="text-mine-shaft-200 cursor-pointer" stroke={2} />
      </div>

      {/* Progress Section */}
      {/* <div className="mt-2">
        <div className="flex justify-between text-mine-shaft-200 text-xs mb-1">
          <span>Fundraising Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <Progress 
          value={progressPercentage} 
          color="bright-sun" 
          size="sm" 
          styles={{
            bar: { backgroundColor: '#f9a826' },
            root: { backgroundColor: 'rgba(249, 168, 38, 0.2)' }
          }}
        />
        <div className="flex justify-between text-mine-shaft-300 text-xs mt-1">
          <span>Raised: ₹{(ngoDetails?.raisedAmount || 0).toLocaleString()}</span>
          <span>Goal: ₹{ngo.Goal.toLocaleString()}</span>
        </div>
      </div> */}

      {/* Progress Section */}
<div className="mt-2">
  <div className="flex justify-between text-mine-shaft-200 text-xs mb-1">
    <span>Fundraising Progress</span>
    <span>{progressPercentage}%</span>
  </div>
  <div className="relative h-2 bg-mine-shaft-800 rounded-full overflow-hidden">
    <div 
      className="absolute top-0 left-0 h-full bg-bright-sun-400 rounded-full"
      style={{
        width: `${progressPercentage}%`,
        transition: 'width 1s ease-out'
      }}
    ></div>
  </div>
  <div className="flex justify-between text-mine-shaft-300 text-xs mt-1">
    <span>Raised: ₹{(ngoDetails?.raisedAmount || 0).toLocaleString()}</span>
    <span>Goal: ₹{ngo.Goal.toLocaleString()}</span>
  </div>
</div>

      {/* Donation Input */}
      <div className="text-mine-shaft-200 mt-2">
        <TextInput
          variant="unstyled"
          label="Donation Amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) setAmount(value);
          }}
          styles={{ 
            input: { 
              color: "white",
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem'
            } 
          }}
        />
      </div>

      {/* Goal and Description */}
      <div className="text-mine-shaft-100 text-sm">
        <span className="font-semibold text-bright-sun-400">Goal: </span>₹{ngo.Goal}
      </div>
      <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
        {ngo.description}
      </Text>

      <Divider mt={8} size="xs" mx="" color="#5a5a5a" />

      {/* Donate Button and Date */}
      <div className="overflow-visible flex gap-5 items-center">
        <Button 
          mt={7} 
          variant="light" 
          color="brightSun.4" 
          radius="md" 
          onClick={checkoutHandler}
          className="hover:bg-bright-sun-400/20 transition-all"
        >
          Donate
        </Button>
        <div className="flex items-center text-mine-shaft-400 text-xs">
          <IconClockHour3 className="h-5 w-5 mr-1" stroke={1} />
          {new Date(ngo.createdAt).toDateString()}
        </div>
      </div>
    </div>
  );
}

export default NGOCard;