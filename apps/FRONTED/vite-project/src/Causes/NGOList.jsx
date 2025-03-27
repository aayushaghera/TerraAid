// import { useEffect, useState } from "react";
// import NGOCard from "./NGOCard"; // Import NGOCard component

// export function NGOList() {
//   const [ngoList, setNgoList] = useState([]);

//   // Fetch NGOs from the backend
//   useEffect(() => {
//     fetch("http://localhost:1200/Post/GetPost")
//       .then((res) => res.json())
//       .then((data) => setNgoList(data)); // Ensure correct array structure
//   }, []);

//   return (
//     <div className="flex flex-wrap gap-20">
//       {/* {ngoList.map((ngo, index) => (
//         <NGOCard key={index} ngo={ngo} /> // Pass each NGO as a prop
//       ))} */}
//       {ngoList.map((ngo) => (
//   <NGOCard key={ngo._id} ngo={ngo} /> 
//   // Pass `_id` as part of `ngo` object
// ))}

//     </div>
//   );
// }

// export default NGOList;


import { useEffect, useState } from "react";
import { TextInput } from "@mantine/core";
import NGOCard from "./NGOCard";

export function NGOList() {
  const [ngoList, setNgoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch NGOs from the backend
  useEffect(() => {
    fetch("http://localhost:1200/Post/GetPost")
      .then((res) => res.json())
      .then((data) => {
        setNgoList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching NGOs:", error);
        setLoading(false);
      });
  }, []);

  // Filter NGOs based on location search
  const filteredNGOs = ngoList.filter(ngo =>
    ngo.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Loading NGOs...</div>;
  }

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="mb-6 max-w-md mx-auto">
        <TextInput
          placeholder="Search by location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          styles={{
            input: {
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '1px solid #333',
              '&:focus': {
                borderColor: '#f9a826' // Bright sun color when focused
              }
            }
          }}
        />
      </div>

      {/* NGO Cards Grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredNGOs.length > 0 ? (
          filteredNGOs.map((ngo) => (
            <NGOCard key={ngo._id} ngo={ngo} />
          ))
        ) : (
          <div className="text-center w-full py-12 text-gray-400">
            {searchTerm 
              ? `No NGOs found in "${searchTerm}"`
              : "No NGOs available"}
          </div>
        )}
      </div>
    </div>
  );
}

export default NGOList;