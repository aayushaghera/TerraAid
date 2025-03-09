// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";


// const NGOChart = () => {
//   const [ngoData, setNgoData] = useState({ states: [], counts: [] });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://aayushaghera.github.io/State_API/city_data1.json"); // Replace with your API
//         const jsonData = await response.json();

//         // Ensure we access the correct data key
//         if (!jsonData.city_data) {
//           console.error("Invalid data format");
//           return;
//         }

//         // Count NGOs per State
//         const stateCount = {};
//         jsonData.city_data.forEach((item) => {
//           const state = item.State;
//           stateCount[state] = (stateCount[state] || 0) + 1;
//         });

//         // Extract State names and NGO counts
//         setNgoData({
//           states: Object.keys(stateCount),
//           counts: Object.values(stateCount),
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Bar Chart Data
//   const data = {
//     labels: ngoData.states,
//     datasets: [
//       {
//         label: "Number of NGOs",
//         data: ngoData.counts,
//         backgroundColor: "#FFB800",
//       },
//     ],
//   };

//   return (
//     <div className="" style={{ width: "80%", margin: "auto", textAlign: "center" }}>
//       <h2 className="mt-3">NGO Count Per State</h2>
//       <div className="mt-3">
//       <Bar data={data} />
//       </div>
//     </div>
//   );
// };

// export default NGOChart;


import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

const NGOChart = () => {
  const [ngoData, setNgoData] = useState({ states: [], counts: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://aayushaghera.github.io/State_API/city_data1.json");
        const jsonData = await response.json();

        if (!jsonData.city_data) {
          console.error("Invalid data format");
          return;
        }

        const stateCount = {};
        jsonData.city_data.forEach((item) => {
          const state = item.State;
          stateCount[state] = (stateCount[state] || 0) + 1;
        });

        setNgoData({
          states: Object.keys(stateCount),
          counts: Object.values(stateCount),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ngoData.states,
    datasets: [
      {
        label: "Number of NGOs",
        data: ngoData.counts,
        backgroundColor: "#FFB800",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, // Prevents infinite height growth
  };

  return (
    <div className="mt-3" style={{ width: "80%",  margin: "auto", textAlign: "center" }}>
      <h2 className="mt-3">NGO Count Per State</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default NGOChart;



