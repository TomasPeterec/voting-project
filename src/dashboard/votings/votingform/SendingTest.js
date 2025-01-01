import React, { useState } from 'react';
import axios from 'axios';
import { useMainContext } from '../../../contexts/useMainContext'; // Correct path to your context

const apiUrl = process.env.REACT_APP_API_ROOT_VAR;

function SendingTest(votingsResult) {
  const { appState, appStateSetter } = useMainContext();
  //const [depositOfResults, setDepositOfResults] = useState(votingsResult);

  const handleClick = async () => {
    if (votingsResult) {
      const response = await axios.put(
        `${apiUrl}/api/listOfVotings/${appState.idOfVotesFromMailLink}/insert-voting-data/${appState.emailIdFromMailLink}`,
        {
          votingData: votingsResult,
        },
      );
    }
    appStateSetter('voteSended', 'sended');
  };

  return <button onClick={handleClick}>Send Data</button>;
}

export default SendingTest;
