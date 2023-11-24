import React, { useState, useEffect } from 'react';
import DVotingItem from "./items/DVotingItem";
import axios from 'axios';

const DashBoardVotingItemsCopy = ({ userId }) => {
  const [listOfVotes, setListOfVotes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before starting the operation
        setLoading(true);

        // Replace 'your-api-endpoint' with the actual endpoint where you want to fetch the data
        const response = await axios.get(`http://localhost:5000/api/listOfVotings/${userId}`);
        const data = response.data;

        // Set data and loading to false when the operation is complete
        setListOfVotes(data);
        setLoading(false);
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function

  }, [setLoading, setListOfVotes]); // Dependency array includes 'setLoading, setListOfVotes'

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
                <DVotingItem nameOfVotes={vote.name_of_voting} />} 
                <div style={{height: "7px"}}></div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashBoardVotingItemsCopy;
