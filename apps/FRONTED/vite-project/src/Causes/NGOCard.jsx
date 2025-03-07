import { IconUserSquare } from '@tabler/icons-react';
import { IconBookmark } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';
import { Text } from '@mantine/core';
import {  Divider } from '@mantine/core';
import { Button } from '@mantine/core';
import { IconClockHour3 } from '@tabler/icons-react';

// function NGOCard({ ngo }) {
//   return (
//     <div className="bg-mine-shaft-900 p-4 w-72 m-2 mt-5 flex flex-col gap-2">
//       <div className="flex justify-between">
//         <div className="flex gap-2 items-center">
//           <div className="p-2 bg-mine-shaft-800 rounded-md">
//             <IconUserSquare className="h-7 text-bright-sun-400" stroke={2} />
//           </div>
//           <div>
//             <div className="text-mine-shaft-200 font-semibold">{ngo.Name}</div>
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
//           styles={{
//             input: {
//               color: "white",
//             },
//           }}
//         />
//       </div>
      
//       <div className="text-mine-shaft-100 text-sm">
//         <span className="font-semibold text-bright-sun-400">Goal: </span>₹{ngo.Goal}
//       </div>
      
//       <div>
//         <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
//           {ngo.description}
//         </Text>
//       </div>
      
//       <Divider mt={8} size="xs" mx="" color="#5a5a5a" />

//       <div className="flex gap-20 justify-between items-center ">
//         {/* <Button mt={7} variant="filled" color="yellow" radius="md">Donate</Button> */}

//         <div className="overflow-visible">
//        <Button mt={7} variant="light" color="brightSun.4" radius="md">Donate</Button>
//         </div>

//         <div className="flex items-center text-mine-shaft-400 text-xs">
//           <IconClockHour3 className="h-5 w-5 mr-1" stroke={1} />
//           {new Date(ngo.createdAt).toDateString()} {/* Format date */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NGOCard;


import  { useState } from "react";


function NGOCard({ ngo }) {
  const [amount, setAmount] = useState("");

  const checkoutHandler = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    try {
      // Create an order
      const orderResponse = await fetch("http://localhost:1200/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
      const orderData = await orderResponse.json();

      const options = {
        amount: orderData.order.amount,
        currency: "INR",
        name: ngo.Name,
        description: "Support a cause",
        order_id: orderData.order.id,
        callback_url: "http://localhost:1200/api/paymentverification",
        prefill: {
          name: "Donor",
          email: "donor@example.com",
          contact: "9999999999",
        },
        theme: { color: "#121212" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-mine-shaft-900 p-4 w-72 m-2 mt-5 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <IconUserSquare className="h-7 text-bright-sun-400" stroke={2} />
          </div>
          <div>
            <div className="text-mine-shaft-200 font-semibold">{ngo.Name}</div>
            <div className="text-mine-shaft-300 text-xs">{ngo.location}</div>
          </div>
        </div>
        <IconBookmark className="text-mine-shaft-200 cursor-pointer" stroke={2} />
      </div>

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
            },
          }}
        />
      </div>

      <div className="text-mine-shaft-100 text-sm">
        <span className="font-semibold text-bright-sun-400">Goal: </span>₹{ngo.Goal}
      </div>

      <div>
        <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
          {ngo.description}
        </Text>
      </div>

      <Divider mt={8} size="xs" mx="" color="#5a5a5a" />

      <div className="overflow-visible flex gap-5 items-center">

        <Button mt={7} variant="light" color="brightSun.4" radius="md"  onClick={checkoutHandler}>
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
