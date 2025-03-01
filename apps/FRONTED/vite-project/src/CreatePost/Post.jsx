import BaseDemo from "./BaseDemo";
import InputWithLabel from "./InputWithLabe";
import TextEditor from "./TextEditor";
import { SimpleSelect } from './SimpleSelect';
import { BasicSelect } from "./BasicSelect";
import { Button } from '@mantine/core';
import { useState } from "react";

function Post() {
  const [formData, setFormData] = useState({
    Name: "",
    location: "",
    Goal: "",
    description: "",
    name: "",
    email: "",
    phone: "",
    referenceId: "",
    legalBusinessName: "",
    businessType: "",
    contactName: "",
    address: {
      street1: "",
      street2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
    },
    pan: "",
    gst: "",
    bankDetails: {
      accountNumber: "",
      ifsc: "",
    },
    contactDetails: {
      name: "",
      email: "",
      contact: "",
      type: "",
      reference_id: "",
      notes: {
        position: "",
        comments: "",
      },
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
  
    setFormData((prevData) => {
      const updatedData = structuredClone(prevData); // Deep copy
      const keys = id.split(".");  // ✅ Now splitting by dot
  
      let current = updatedData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}; // Ensure path exists
        current = current[keys[i]];
      }
  
      current[keys[keys.length - 1]] = value;
  
      return updatedData;
    });
  };
  ;

  const handleSubmit = async () => {
    // Convert formData to a string and check if it contains empty values
    const isFormComplete = Object.values(formData).every((value) => {
      if (typeof value === "object") {
        return Object.values(value).every((subValue) => subValue !== "");
      }
      return value !== "";
    });
  
    if (!isFormComplete) {
      alert("Please complete all details before submitting.");
      return; // Stop execution if form is incomplete
    }
    console.log("Final formData before submission:", formData); // Debugging

    try {
      const response1 = await fetch("http://localhost:1200/Post/CreatePost", {
        method: "POST",
        body: JSON.stringify({
          Name: formData.Name,
          location: formData.location,
          Goal: formData.Goal,
          description: formData.description,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response1.ok) throw new Error("Failed to post NGO details");

      const response2 = await fetch("http://localhost:1200/Post/register-ngo", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response2.ok) throw new Error("Failed to register NGO");

      alert("NGO Registration Successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error in registration. Check console for details.");
    }
  };

  
  return (
    <div className="w-4/5 mx-auto max-w-4xl py-10">
      <div className="text-mine-shaft-200 m-2 text-2xl font-semibold">Post NGO</div>

      <div className="grid grid-cols-2 gap-10 mt-7 m-8 mx-30">
        <InputWithLabel label="Organization Name" type="text" id="Name" placeholder="Enter your Organization Name" value={formData.Name} required onChange={handleChange} />
        <InputWithLabel label="Location" type="text" id="location" placeholder="Enter Organization Location" value={formData.location} required onChange={handleChange} />
        <InputWithLabel label="Fundraising Goal" type="text" id="Goal" placeholder="Enter your target amount" value={formData.Goal} required onChange={handleChange} />
        <InputWithLabel label="Campaign Description" type="text" id="description" placeholder="Enter details about your campaign" value={formData.description} required onChange={handleChange} />
      </div>

      <div className="text-sm font-medium text-white">NGO Description</div>
      <TextEditor />

      <div className="text-sm font-medium text-white mt-5">Upload Image</div>
      <BaseDemo />

      <div className="grid grid-cols-2 gap-10 mt-7 m-8 mx-30">
        <InputWithLabel label="Organization Name" type="text" id="name" placeholder="Enter your Organization Name" value={formData.name} required onChange={handleChange} />
        <InputWithLabel label="Email" type="email" id="email"placeholder="Enter your email" value={formData.email} required onChange={handleChange} />
        <InputWithLabel label="Phone Number" type="tel" id="phone" placeholder="Enter your phone number" value={formData.phone} required onChange={handleChange} />
        <InputWithLabel label="Reference ID" type="text" id="referenceId" placeholder="Enter reference ID" value={formData.referenceId} required onChange={handleChange} />
        <InputWithLabel label="Legal Business Name" type="text" id="legalBusinessName" placeholder="Enter legal business name" value={formData.legalBusinessName} required onChange={handleChange} />


        <SimpleSelect 
        value={formData.businessType} 
        onChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))} 
        />

        <InputWithLabel label="Contact Name" type="text" id="contactName" placeholder="Enter contact person's name" value={formData.contactName} required onChange={handleChange} />
        <InputWithLabel label="Street Address 1" type="text" id="address.street1"  placeholder="Enter street address" value={formData.address.street1} required onChange={handleChange} />
        <InputWithLabel label="Street Address 2" type="text" id="address.street2" placeholder="Enter additional address info" value={formData.address.street2} required onChange={handleChange} />
        <InputWithLabel label="City" type="text" id="address.city"  placeholder="Enter city" value={formData.address.city} required onChange={handleChange} />
        <InputWithLabel label="State" type="text" id="address.state"  placeholder="Enter state" value={formData.address.state} required onChange={handleChange} />
        <InputWithLabel label="Postal Code" type="text" id="address.postal_code" placeholder="Enter postal code" value={formData.address.postal_code} required onChange={handleChange} />
        <InputWithLabel label="Country" type="text" id="address.country"  placeholder="Enter country" value={formData.address.country} required onChange={handleChange} />

        <InputWithLabel label="PAN" type="text" id="pan" placeholder="Enter PAN number" value={formData.pan} required onChange={handleChange} />
        <InputWithLabel label="GST Number" type="text" id="gst" placeholder="Enter GST number" value={formData.gst} required onChange={handleChange} />
        <InputWithLabel label="Bank Account Number" type="text" id="bankDetails.accountNumber" placeholder="Enter bank account number" value={formData.bankDetails.accountNumber} required onChange={handleChange} />
        <InputWithLabel label="IFSC Code" type="text" id="bankDetails.ifsc" placeholder="Enter IFSC code" value={formData.bankDetails.ifsc} required onChange={handleChange} />

        <InputWithLabel label="Contact Person Name" type="text" id="contactDetails.name" placeholder="Enter contact person's name" value={formData.contactDetails.name} required onChange={handleChange} />
        <InputWithLabel label="Contact Person Email" type="email" id="contactDetails.email" placeholder="Enter contact person's email" value={formData.contactDetails.email} required onChange={handleChange} />
        <InputWithLabel label="Contact Person Number" type="tel" id="contactDetails.contact" placeholder="Enter contact person's phone number" value={formData.contactDetails.contact} required onChange={handleChange} />

  
        
        <BasicSelect 
        value={formData.contactDetails.type} 
        onChange={(value) => setFormData((prev) => ({ 
        ...prev, 
        contactDetails: { ...prev.contactDetails, type: value } 
        }))} 
        />

        <InputWithLabel label="Contact Reference ID" type="text" id="contactDetails.reference_id" placeholder="Enter contact reference ID" value={formData.contactDetails.reference_id} required onChange={handleChange} />
        <InputWithLabel label="Position" type="text" id="contactDetails.notes.position" placeholder="Enter contact person's position" value={formData.contactDetails.notes.position} required onChange={handleChange} />
        <InputWithLabel label="Comments" type="text" id="contactDetails.notes.comments" placeholder="Enter comments" value={formData.contactDetails.notes.comments} required onChange={handleChange} />
      </div>

      <div className="flex gap-4">
        <Button color="brightSun.4" onClick={handleSubmit} variant="light">Publish Post</Button>
      </div>
    </div>
  );

}

export default Post;



// function Post() {
//   return (
//     <div className="w-4/5 mx-auto max-w-4xl py-10">
//       <div className="text-mine-shaft-200 m-2 text-2xl font-semibold">Post NGO</div>

//       {/* Grid layout for 6 inputs (2 per row) */}
//       <div className="grid grid-cols-2 gap-10 mt-7 m-8 mx-30" >
//         <InputWithLabel
//           label="Organization Name"
//           type="text "
//           id="Ngo name "
//           required={true}
//           placeholder="Enter your Organization Name"
//           className=""
//         />

//         <InputWithLabel
//           label="Location"
//           type="text"
//           id="location"
//           required={true}
//           placeholder="Enter Organization Location"
//           className=""
//         />

//         <InputWithLabel
//         label="Fundraising Goal"
//         type="text"
//         id="fundraisingGoal"
//         required={true}
//         placeholder="Enter your target amount"
//         className=""
//         />


//        <InputWithLabel
//        label="Campaign Description"
//        type="text"
//        id="campaignDescription"
//        required={true}
//        placeholder="Enter details about your campaign"
//        className=""
//       />
       
//       </div>

//       <div className="text-sm font-medium text-white ">NGO Description</div>
//       <div className="">
//         <TextEditor></TextEditor>
//       </div>

//       <div className="text-sm font-medium text-white mt-5">Upload Image</div>
//       <div className="">
//         <BaseDemo></BaseDemo>
//       </div>

//       <div className="grid grid-cols-2 gap-10 mt-7 m-8 mx-30">
//   <InputWithLabel
//     label="Organization Name"
//     type="text"
//     id="name"
//     required={true}
//     placeholder="Enter your Organization Name"
//   />

//   <InputWithLabel
//     label="Email"
//     type="email"
//     id="email"
//     required={true}
//     placeholder="Enter your email"
//   />

//   <InputWithLabel
//     label="Phone Number"
//     type="tel"
//     id="phone"
//     required={true}
//     placeholder="Enter your phone number"
//   />

//   <InputWithLabel
//     label="Reference ID"
//     type="text"
//     id="referenceId"
//     required={true}
//     placeholder="Enter reference ID"
//   />

//   <InputWithLabel
//     label="Legal Business Name"
//     type="text"
//     id="legalBusinessName"
//     required={true}
//     placeholder="Enter legal business name"
//   />

//   {/* <InputWithLabel
//     label="Business Type"
//     type="text"
//     id="businessType"
//     required={true}
//     placeholder="Enter business type"
//   /> */}

//     <div>
//       <SimpleSelect />
//     </div>

//   <InputWithLabel
//     label="Contact Name"
//     type="text"
//     id="contactName"
//     required={true}
//     placeholder="Enter contact person's name"
//   />

//   <InputWithLabel
//     label="Street Address 1"
//     type="text"
//     id="street1"
//     required={true}
//     placeholder="Enter street address"
//   />

//   <InputWithLabel
//     label="Street Address 2"
//     type="text"
//     id="street2"
//     required={true}
//     placeholder="Enter additional address info"
//   />

//   <InputWithLabel
//     label="City"
//     type="text"
//     id="city"
//     required={true}
//     placeholder="Enter city"
//   />

//   <InputWithLabel
//     label="State"
//     type="text"
//     id="state"
//     required={true}
//     placeholder="Enter state"
//   />

//   <InputWithLabel
//     label="Postal Code"
//     type="text"
//     id="postal_code"
//     required={true}
//     placeholder="Enter postal code"
//   />

//   <InputWithLabel
//     label="Country"
//     type="text"
//     id="country"
//     required={true}
//     placeholder="Enter country"
//   />

//   <InputWithLabel
//     label="PAN"
//     type="text"
//     id="pan"
//     required={true}
//     placeholder="Enter PAN number"
//   />

//   <InputWithLabel
//     label="GST Number"
//     type="text"
//     id="gst"
//     required={true}
//     placeholder="Enter GST number"
//   />

//   <InputWithLabel
//     label="Bank Account Number"
//     type="text"
//     id="accountNumber"
//     required={true}
//     placeholder="Enter bank account number"
//   />

//   <InputWithLabel
//     label="IFSC Code"
//     type="text"
//     id="ifsc"
//     required={true}
//     placeholder="Enter IFSC code"
//   />

//   <InputWithLabel
//     label="Contact Person Name"
//     type="text"
//     id="contactDetails_name"
//     required={true}
//     placeholder="Enter contact person's name"
//   />

//   <InputWithLabel
//     label="Contact Person Email"
//     type="email"
//     id="contactDetails_email"
//     required={true}
//     placeholder="Enter contact person's email"
//   />

//   <InputWithLabel
//     label="Contact Person Number"
//     type="tel"
//     id="contactDetails_contact"
//     required={true}
//     placeholder="Enter contact person's phone number"
//   />

//   {/* <InputWithLabel
//     label="Contact Type"
//     type="text"
//     id="contactDetails_type"
//     required={true}
//     placeholder="Enter contact type"
//   /> */}

//     <div>
//       <BasicSelect />
//     </div>

//   <InputWithLabel
//     label="Contact Reference ID"
//     type="text"
//     id="contactDetails_reference_id"
//     required={true}
//     placeholder="Enter contact reference ID"
//   />

//   <InputWithLabel
//     label="Position"
//     type="text"
//     id="contactDetails_notes_position"
//     required={true}
//     placeholder="Enter contact person's position"
//   />

//   <InputWithLabel
//     label="Comments"
//     type="text"
//     id="contactDetails_notes_comments"
//     required={true}
//     placeholder="Enter comments"
//   />
// </div>

//   <div className="flex gap-4">
//   <Button color='brightSun.4' variant='light'>Publish Post</Button>
//   </div>
//     </div>
//   );
// }

// export default Post;
