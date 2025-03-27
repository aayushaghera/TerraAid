import { useState } from "react";
import { Button } from "@mantine/core";
import InputWithLabel from "./InputWithLabe";

function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value, // Update state dynamically based on input ID
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill all fields before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:1200/user/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message.");

      alert("Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" }); // Reset form
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="w-4/5 mx-auto max-w-4xl py-10">
      <div className="text-mine-shaft-200 m-2 text-2xl font-semibold">Contact Us</div>

      {/* Form Inputs */}
      <div className="grid grid-cols-2 gap-10 mt-7 m-8">
        <InputWithLabel label="First Name" type="text" id="firstName" placeholder="Enter First Name" value={formData.firstName} onChange={handleChange} required />
        <InputWithLabel label="Last Name" type="text" id="lastName" placeholder="Enter Last Name" value={formData.lastName} onChange={handleChange} required />
        <InputWithLabel label="Email" type="email" id="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange} required />
        <InputWithLabel label="Subject" type="text" id="subject" placeholder="Enter Subject" value={formData.subject} onChange={handleChange} required />
        <InputWithLabel label="Message" type="text" id="message" placeholder="Enter details about your Query" value={formData.message} onChange={handleChange} required />
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button color="brightSun.4" onClick={handleSubmit} variant="light">Send Message</Button>
      </div>
    </div>
  );
}

export default Contact;
