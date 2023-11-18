import React, { useState, useEffect } from 'react';
import DVotingItem from "./items/DVotingItem";


const DashBoardVotingItems = ({ email }) => {
  const [listOfVotes, setListOfVotes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a delay to mimic the loading time (replace with actual async code)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulated data
        const simulatedData = [
          { name: "Pet Vote" },
          { name: "Hiking 2023" },
          { name: "Darcek ucitelke" },
          { name: "Nedelny obed" }
        ];

        // Set data and loading to false when the operation is complete
        setListOfVotes(simulatedData);
        setLoading(false);
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function

    // Cleanup function (optional)
    return () => {
      // You can perform cleanup here if needed
    };
  }, [email]); // Dependency array includes 'email'

  return (
    <div>
      {loading ? (
        // Render the loader when loading is true
        <p>Loading...</p>
      ) : (
        // Render your component content when loading is false
        <div>
          <ul style={{ listStyleType: 'none', padding: "0px" }}>
            {listOfVotes.map((vote, index) => (
              <li key={index}>{
                <DVotingItem nameOfVotes={vote.name} />} 
                <div style={{height: "7px"}}></div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashBoardVotingItems;
