import { Typography, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import mobileWidth from '../../../css-and-material/isDevice';
import { modalWindowsStyles } from '../../../css-and-material/modalWindowsStyles';
import votingTheme from '../../../css-and-material/theme';
import firebaseConfig from '../../../firebaseConfig';
import { testIfItExists } from '../../common/alreadyExist';
import { sanitizeForApi } from '../../common/sanitize';
import { styles02 } from '../../../css-and-material/styles-02';
import { Filter } from 'bad-words'; // Correct the import to use named export

// Import custom bad words from external file
import { badWords } from '../../badwords'; // Update the path as necessary

initializeApp(firebaseConfig);
const apiUrl = process.env.REACT_APP_API_ROOT_VAR;

const DashBoardVotingsForm = ({ triggerReload, arrFromItems }) => {
  //const { idToken } = useAuth(); // Use the context to get user and token
  const { getValidToken } = useAuth(); // Use the context to get user and token
  const [noteBelowTheInput, setNoteBelowTheInput] = useState('Required input');
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState('');

  const filter = new Filter(); // Create a filter instance

  // Add custom bad words from the external file
  filter.addWords(...badWords); // Spread the array to add the words

  // Check if the input contains offensive words
  const checkForProfanity = (input) => {
    return filter.isProfane(input); // Returns true if the input contains profanity
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for profanity before submitting
    if (checkForProfanity(formData)) {
      setNoteBelowTheInput('Your input contains inappropriate words.');
      return; // Stop form submission if profanity is found
    }
    const localIdToken = await getValidToken();
    if (localIdToken) {
      try {
        if (noteBelowTheInput !== 'Such name of item is already in the list') {
          if (formData !== '' && formData !== ' ' && formData !== '.' && formData !== ',') {
            const response = await axios.post(
              `${apiUrl}/api/listOfVotings/insert`,
              {
                name_of_emaillist: formData.trim(),
                name_of_voting: formData.trim(),
              },
              {
                headers: {
                  Authorization: `Bearer ${localIdToken}`,
                },
              },
            );
            console.log(response.data);
            triggerReload();
            setFormData('');
          }
        }
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    }
  };

  const handleChange = (e) => {
    setFormData(sanitizeForApi(e.target.value));
    setNoteBelowTheInput(testIfItExists(arrFromItems, 'name_of_voting', sanitizeForApi(e.target.value).trim()));
  };

  const handleClickModalOn = () => {
    setClicked(true);
  };

  const handleClickModalOff = () => {
    setClicked(false);
  };

  // breakpoint
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  const localStyles = {
    ...modalWindowsStyles,
    automaticRow: {
      ...modalWindowsStyles.automaticRow,
      flexDirection: isMobile ? 'column' : 'row',
    },
    returnButton: {
      ...modalWindowsStyles.returnButton,
      margin: '0px',
      padding: isMobile ? modalWindowsStyles.returnButton.padding : '18px',
      paddingLeft: isMobile ? modalWindowsStyles.returnButton.padding : '14px',
      paddingRight: isMobile ? modalWindowsStyles.returnButton.padding : '14px',
      height: isMobile ? modalWindowsStyles.returnButton.height : '100%',
    },
    sendButton: {
      ...modalWindowsStyles.sendButton,
      margin: '0px',
      padding: isMobile ? modalWindowsStyles.sendButton.padding : '18px',
      paddingLeft: isMobile ? modalWindowsStyles.sendButton.padding : '14px',
      paddingRight: isMobile ? modalWindowsStyles.sendButton.padding : '14px',
      height: isMobile ? modalWindowsStyles.sendButton.height : '100%',
    },
    buttonPlacement: {
      paddingLeft: isMobile ? '0px' : '20px',
      paddingTop: isMobile ? '10px' : '10px',
      display: 'flex',
      flexDirection: 'row',
    },
    solidFoundation: {
      ...modalWindowsStyles.solidFoundation,
      width: isMobile ? modalWindowsStyles.solidFoundation.width : '100%',
      paddingTop: '12px',
    },
    solidFoundationLittle: {
      ...modalWindowsStyles.solidFoundation,
      width: '85px',
      height: '85px',
      borderRadius: '25px',
      borderTopRightRadius: '25px',
      borderTopLeftRadius: '25px',
      paddingTop: '4px',
      paddingBottom: '4px',
      paddingLeft: '4px',
      paddingRight: '4px',
    },
    sendButton02: {
      ...modalWindowsStyles.sendButton,
      margin: '0px',
      width: '100%',
      height: '100%',
      borderRadius: '21px',
      borderWidth: '3.3px',
    },
  };

  return (
    <>
      <div style={isMobile ? styles02.separatorFlat : styles02.separatorHigh}></div>
      <div style={isMobile ? styles02.floatedVisible : styles02.floatedHidden}>
        <div style={localStyles.solidFoundationLittle}>
          <Button style={localStyles.sendButton02} onClick={handleClickModalOn}>
            Add
          </Button>
        </div>
      </div>
      <div
        style={
          isMobile
            ? !clicked
              ? styles02.desktopFormContainerHidden
              : styles02.displayed
            : styles02.desktopFormContainerVisible
        }
      >
        <div style={{ height: '40%' }}></div>
        <div style={isMobile ? modalWindowsStyles.nameOfItemOnModalNest : styles02.modalInnerDivDesk}>
          <div style={localStyles.solidFoundation}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <div style={localStyles.automaticRow}>
                <div style={{ width: '100%', textAlign: 'left' }}>
                  <Typography sx={votingTheme.typography.formDescription}>The name of the new vote</Typography>
                  <input
                    style={modalWindowsStyles.inputStyle}
                    type="text"
                    name="name"
                    value={formData}
                    onChange={handleChange}
                    placeholder="Enter input"
                  />
                  <Typography sx={votingTheme.typography.inputRequired}>{noteBelowTheInput}</Typography>
                </div>
                <div>
                  <div style={localStyles.buttonPlacement}>
                    <Button style={localStyles.sendButton} type="submit" onClick={handleClickModalOff}>
                      Add
                    </Button>
                    {isMobile ? (
                      <>
                        <div style={{ width: '20px' }}></div>
                        <Button style={localStyles.returnButton} type="button" onClick={handleClickModalOff}>
                          Return
                        </Button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardVotingsForm;
