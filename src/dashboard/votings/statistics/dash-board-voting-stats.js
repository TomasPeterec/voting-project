import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import { useMainContext } from '../../../contexts/useMainContext';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const apiUrl = process.env.REACT_APP_API_ROOT_VAR;

const DashBoardVotingStats = () => {
  const { appState, appStateSetter } = useMainContext();
  const { idToken } = useAuth(); // Use the context to get and token
  const [loading, setLoading] = useState(true);
  const [statsArr, setStatsArr] = useState([]);

  useEffect(() => {
    const fetchListOfVotings = async () => {
      if (idToken) {
        try {
          console.log('API URL:', apiUrl);
          console.log('Chosen Vote ID:', appState.chosenVotesId);

          const response = await axios.get(`${apiUrl}/api/listOfVotings/${appState.chosenVotesId}/candidates`, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          console.log('Response data:', response.data);

          const arrNew = response.data;

          const auxiliaryArr = arrNew.map((item) => ({
            name: item.name.replace(/ /g, '\u00A0'), // Replace normal spaces with non-breaking spaces
            opv: item.voting_value,
            md: item.average_variance,
            mj: ((75 - item.average_variance) * item.voting_value) / 75,
          }));

          setStatsArr(auxiliaryArr);

          // Update statsArr or other states here based on the response
        } catch (error) {
          console.error('Error fetching list of votes:', error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchListOfVotings();
  }, [idToken]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={statsArr}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 170,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="opv" fill="#8884d8" activeShape={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey="md" fill="#bbbbbb" activeShape={<Rectangle fill="gold" stroke="purple" />} />
        <Bar dataKey="mj" fill="#ff9999" activeShape={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashBoardVotingStats;
