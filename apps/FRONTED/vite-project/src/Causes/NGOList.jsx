import { useEffect, useState } from "react";
import NGOCard from "./NGOCard"; // Import NGOCard component

export function NGOList() {
  const [ngoList, setNgoList] = useState([]);

  // Fetch NGOs from the backend
  useEffect(() => {
    fetch("http://localhost:1200/Post/GetPost")
      .then((res) => res.json())
      .then((data) => setNgoList(data)); // Ensure correct array structure
  }, []);

  return (
    <div className="flex flex-wrap gap-20">
      {ngoList.map((ngo, index) => (
        <NGOCard key={index} ngo={ngo} /> // Pass each NGO as a prop
      ))}
    </div>
  );
}

export default NGOList;

