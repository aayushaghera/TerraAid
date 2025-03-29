
// import React, { useEffect, useState } from "react";
// import NGOFundraisingReport from "./NGOFundraisingReport";

// const NGOList = () => {
//   const [ngoList, setNgoList] = useState([]); // Stores list of all NGOs
//   const [fetchedNGOs, setFetchedNGOs] = useState([]); // Stores fetched NGOs with details
//   const [currentIndex, setCurrentIndex] = useState(0); // Tracks which NGO is being fetched
//   const [searchTerm, setSearchTerm] = useState(""); // Stores search input

//   // Fetch all NGOs from the backend
//   useEffect(() => {
//     fetch("http://localhost:1200/Administrator/GetDonationRecord")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched NGO list:", data);
//         setNgoList(data);
//       })
//       .catch((error) => console.error("Error fetching NGO list:", error));
//   }, []);

//   // Fetch details for one NGO at a time
//   useEffect(() => {
//     if (ngoList.length > 0 && currentIndex < ngoList.length) {
//       fetchNGOData(ngoList[currentIndex]);
//     }
//   }, [currentIndex, ngoList]);

//   // Fetch detailed data for a single NGO
//   const fetchNGOData = async (ngo) => {
//     try {
//       if (!ngo || !ngo.ngoId) {
//         console.error("Invalid NGO data received:", ngo);
//         return;
//       }

//       const endpoints = [
//         `http://localhost:1200/Administrator/getNGOByPostId/${ngo.ngoId}`,
//         `http://localhost:1200/Administrator/getPOSTByPostId/${ngo.ngoId}`,
//         `http://localhost:1200/Administrator/getDonationHistory/${ngo.ngoId}`,
//         `http://localhost:1200/Administrator/getFundRaiser/${ngo.ngoId}`,
//       ];

//       console.log(`Fetching data for NGO ID: ${ngo.ngoId}`);

//       const responses = await Promise.all(
//         endpoints.map(async (url) => {
//           const res = await fetch(url);
//           const data = await res.json();
//           if (!res.ok) {
//             console.error(`Error fetching ${url}:`, data);
//           }
//           return data;
//         })
//       );

//       const [ngoRes, postRes, historyRes, fundRes] = responses;

//       console.log("Fetched NGO Data:", {
//         ngoDetails: ngoRes,
//         postDetails: postRes,
//         donationHistory: historyRes,
//         fundraiserData: fundRes,
//       });

//       const fetchedNgo = {
//         ...ngo,
//         ngoDetails: ngoRes || {},
//         postDetails: postRes || {},
//         donationHistory: historyRes || [],
//         fundraiserData: fundRes || {},
//       };

//       setFetchedNGOs((prev) => [...prev, fetchedNgo]);
//       setCurrentIndex((prev) => prev + 1);
//     } catch (error) {
//       console.error("Error fetching NGO data:", error);
//     }
//   };

//   // Filter NGOs based on search term
//   const filteredNGOs = fetchedNGOs.filter((ngo) =>
//     ngo.ngoDetails.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Search Input */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search NGO by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-2 border rounded-md text-gray-800"
//         />
//       </div>

//       {/* Loading State */}
//       {fetchedNGOs.length === 0 && <p className="text-gray-500">Loading NGOs...</p>}

//       {/* Filtered NGO List */}
//       {filteredNGOs.map((ngo) =>
//         ngo ? (
//           <div key={ngo.ngoId} className="mb-6">
//             <NGOFundraisingReport ngo={ngo} />
//           </div>
//         ) : null
//       )}
//     </div>
//   );
// };

// export default NGOList;


import React, { useEffect, useState } from "react";
import { TextInput } from "@mantine/core"; // Importing Mantine's TextInput
import NGOFundraisingReport from "./NGOFundraisingReport";

const NGOList = () => {
  const [ngoList, setNgoList] = useState([]); // Stores list of all NGOs
  const [fetchedNGOs, setFetchedNGOs] = useState([]); // Stores fetched NGOs with details
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks which NGO is being fetched
  const [searchTerm, setSearchTerm] = useState(""); // Stores search input

  // Fetch all NGOs from the backend
  useEffect(() => {
    fetch("http://localhost:1200/Administrator/GetDonationRecord")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched NGO list:", data);
        setNgoList(data);
      })
      .catch((error) => console.error("Error fetching NGO list:", error));
  }, []);

  // Fetch details for one NGO at a time
  useEffect(() => {
    if (ngoList.length > 0 && currentIndex < ngoList.length) {
      fetchNGOData(ngoList[currentIndex]);
    }
  }, [currentIndex, ngoList]);

  // Fetch detailed data for a single NGO
  const fetchNGOData = async (ngo) => {
    try {
      if (!ngo || !ngo.ngoId) {
        console.error("Invalid NGO data received:", ngo);
        return;
      }

      const endpoints = [
        `http://localhost:1200/Administrator/getNGOByPostId/${ngo.ngoId}`,
        `http://localhost:1200/Administrator/getPOSTByPostId/${ngo.ngoId}`,
        `http://localhost:1200/Administrator/getDonationHistory/${ngo.ngoId}`,
        `http://localhost:1200/Administrator/getFundRaiser/${ngo.ngoId}`,
      ];

      console.log(`Fetching data for NGO ID: ${ngo.ngoId}`);

      const responses = await Promise.all(
        endpoints.map(async (url) => {
          const res = await fetch(url);
          const data = await res.json();
          if (!res.ok) {
            console.error(`Error fetching ${url}:`, data);
          }
          return data;
        })
      );

      const [ngoRes, postRes, historyRes, fundRes] = responses;

      console.log("Fetched NGO Data:", {
        ngoDetails: ngoRes,
        postDetails: postRes,
        donationHistory: historyRes,
        fundraiserData: fundRes,
      });

      const fetchedNgo = {
        ...ngo,
        ngoDetails: ngoRes || {},
        postDetails: postRes || {},
        donationHistory: historyRes || [],
        fundraiserData: fundRes || {},
      };

      setFetchedNGOs((prev) => [...prev, fetchedNgo]);
      setCurrentIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching NGO data:", error);
    }
  };

  // Filter NGOs based on search term
  const filteredNGOs = fetchedNGOs.filter((ngo) =>
    ngo.ngoDetails.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search Input using Mantine TextInput */}
      <div className="mb-6 max-w-md mx-auto">
        <TextInput
          placeholder="Search by NGO Name."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          styles={{
            input: {
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid #333",
              "&:focus": {
                borderColor: "#f9a826", // Bright sun color when focused
              },
            },
          }}
        />
      </div>

      {/* Loading State */}
      {fetchedNGOs.length === 0 && <p className="text-gray-500">Loading NGOs...</p>}

      {/* Filtered NGO List */}
      {filteredNGOs.map((ngo) =>
        ngo ? (
          <div key={ngo.ngoId} className="mb-6">
            <NGOFundraisingReport ngo={ngo} />
          </div>
        ) : null
      )}
    </div>
  );
};

export default NGOList;
