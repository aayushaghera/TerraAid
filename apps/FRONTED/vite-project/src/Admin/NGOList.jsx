
// import { useEffect, useState } from "react";
// import NGOFundraisingReport from "./NGOFundraisingReport"; // Import the NGOFundraisingReport component

// export function NGOList() {
//   const [ngoList, setNgoList] = useState([]);

//   // Fetch NGOs from the backend
//   useEffect(() => {
//     fetch("http://localhost:1200/Administrator/GetDonationRecord")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Fetched data:", data); // Log the data to inspect its structure
//         setNgoList(data);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <div className="flex flex-wrap gap-6 p-6">
//       {ngoList.map((ngo) => (
//         <NGOFundraisingReport key={ngo._id} ngo={ngo} /> // Pass each NGO as a prop
//       ))}
//     </div>
//   );
// }

// export default NGOList;




import React, { useEffect, useState } from "react";
import NGOFundraisingReport from "./NGOFundraisingReport";

const NGOList = () => {
  const [ngoList, setNgoList] = useState([]); // Stores list of all NGOs
  const [fetchedNGOs, setFetchedNGOs] = useState([]); // Stores fetched NGOs with details
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks which NGO is being fetched

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

  return (
    <div className="p-6 max-w-7xl mx-auto">


      {fetchedNGOs.length === 0 && <p className="text-gray-500">Loading NGOs...</p>}

      {/* {fetchedNGOs.map((ngo) => 
        ngo ? <NGOFundraisingReport key={ngo.ngoId} ngo={ngo} /> : null
      )} */}

{fetchedNGOs.map((ngo) => 
  ngo ? (
    <div key={ngo.ngoId} className="mb-6"> {/* Add margin-bottom */}
      <NGOFundraisingReport ngo={ngo} />
    </div>
  ) : null
)}
    </div>
  );
};

export default NGOList;



