import React from 'react';
import { Typography, useMediaQuery, Box, Button } from '@mui/material';
import axios from 'axios';
import mobileWidth from '../../../css-and-material/isDevice';
import { styles02 } from '../../../css-and-material/styles-02';
import votingTheme from '../../../css-and-material/theme';
import { sanitizeForApi } from '../../common/sanitize';
import { useAuth } from '../../../contexts/AuthContext';
import { modalWindowsStyles } from '../../../css-and-material/modalWindowsStyles';
import '../../../css-and-material/candidate-items.scss'; // Adjust the path if necessary

const apiUrl = process.env.REACT_APP_API_ROOT_VAR;

const DashBoardDistributeForm = ({
  triggerReload,
  userId,
  curentUuid,
  pushClickUp,
  getGlobal,
  setGlobal,
  arrFromItems,
  loadedEmails,
  clearBigArea,
}) => {
  //const { idToken } = useAuth(); // Access user token from context
  const { getValidToken } = useAuth(); // Use the context to get user and token

  const validateString = (value) => typeof value === 'string' && value.trim() !== '' && value !== '.' && value !== ',';

  const handleSubmitToDistribute = async (e) => {
    e.preventDefault();
    const emails = getGlobal.curentSetOfEmails || '';

    //if (!validateString(emails)) return;
    const localIdToken = await getValidToken();
    if (localIdToken) {
      try {
        const response = await axios.post(
          `${apiUrl}/api/voting-records/${curentUuid}`,
          {
            //mails: emails.split(','),
            mails: emails,
          },
          {
            headers: { Authorization: `Bearer ${localIdToken}` },
          },
        );
        triggerReload();
        setGlobal('curentSetOfEmails', '');
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
    }
  };

  const handleSubmitNewList = async (e) => {
    e.preventDefault();
    let emails = getGlobal.curentSetOfEmails || '';
    const listName = getGlobal.nameOfNewSetOfEmails || '';

    if (Array.isArray(emails)) {
      emails = emails.join(', ');
    } else if (typeof emails !== 'string') {
      console.error('Emails should be a string or an array of strings');
      return;
    }

    if (!emails.trim() || !listName.trim()) {
      console.log('Emails or list name are missing');
      return;
    }

    const emailArray = emails
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email !== '');

    if (emailArray.length === 0) {
      console.log('No valid emails found');
      return;
    }
    const localIdToken = await getValidToken();
    if (localIdToken) {
      try {
        const response = await axios.post(
          `${apiUrl}/api/emaillists`,
          {
            lov_id: curentUuid,
            nameOfEmaillist: sanitizeForApi(listName),
            mails: emailArray,
          },
          {
            headers: { Authorization: `Bearer ${localIdToken}` },
          },
        );

        console.log('API Response:', response.data);
        triggerReload();
        setGlobal('nameOfNewSetOfEmails', '');
        setGlobal('saveModalButtonClicked', false);
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
    }
  };

  const handleFormEmailsChange = (e) => {
    setGlobal('curentSetOfEmails', sanitizeForApi(e.target.value));
  };

  const handleChangeNewNameOfMailSet = (e) => {
    setGlobal('nameOfNewSetOfEmails', sanitizeForApi(e.target.value));
  };

  const clearTextArea = () => {
    setGlobal('curentSetOfEmails', '');
  };

  const toggleSaveModal = (isVisible) => {
    setGlobal('saveModalButtonClicked', isVisible);
  };

  const handleLoadClick = () => {
    pushClickUp(true);
  };

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
    areaStyle: {
      ...modalWindowsStyles.inputStyle,
      width: '100%',
      overflowY: 'auto',
      height: isMobile ? '300px' : '250px',
      marginBottom: '0px',
    },
    formOrder: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
    },
    butonBox: {
      display: 'flex',
      gap: '10px',
      flexDirection: !isMobile ? 'column' : 'row',
      paddingLeft: isMobile ? '0px' : '21px',
      marginTop: !isMobile ? '10px' : '20px',
    },
    solidFoundation: {
      ...modalWindowsStyles.solidFoundation,
      width: '100%',
    },
    solidFoundation2: {
      ...modalWindowsStyles.solidFoundation,
      width: '500px',
    },
    nameOfItemOnModalNest: {
      ...styles02.nameOfItemOnModalNest,
      display: 'flex',
      justifyContent: 'center' /* Centers horizontally */,
      alignItems: 'center' /* Centers vertically */,
    },
  };

  return (
    <>
      {getGlobal.saveModalButtonClicked && (
        <div style={styles02.modalSaveVisible}>
          <div style={localStyles.nameOfItemOnModalNest}>
            <div style={localStyles.solidFoundation2}>
              <form onSubmit={handleSubmitNewList}>
                <Typography sx={votingTheme.typography.formDescription}>The name of the new list</Typography>
                <input
                  style={modalWindowsStyles.inputStyle}
                  type="text"
                  placeholder="Enter list name"
                  value={getGlobal.nameOfNewSetOfEmails}
                  onChange={handleChangeNewNameOfMailSet}
                />
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '20px',
                    height: '60px',
                  }}
                >
                  <Button type="submit" style={localStyles.sendButton}>
                    SAVE
                  </Button>
                  <Button onClick={() => toggleSaveModal(false)} style={localStyles.returnButton}>
                    Return
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div style={styles02.desktopFormContainerVisible}>
        <div style={localStyles.solidFoundation}>
          <form onSubmit={handleSubmitToDistribute} style={localStyles.formOrder}>
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <div className="inter-form-title">Email addresses</div>
              <textarea
                style={localStyles.areaStyle}
                rows={isMobile ? 24 : 8}
                cols={150}
                value={getGlobal.curentSetOfEmails}
                placeholder="Enter emails separated by commas"
                onChange={handleFormEmailsChange}
              />
            </div>
            <div style={localStyles.butonBox}>
              <Button type="submit" style={localStyles.sendButton}>
                SEND
              </Button>
              <Button onClick={clearTextArea} style={localStyles.returnButton}>
                CLEAR
              </Button>
              <Button onClick={() => toggleSaveModal(true)} style={localStyles.returnButton}>
                SAVE
              </Button>
              {isMobile && (
                <Button onClick={handleLoadClick} style={localStyles.returnButton}>
                  LISTS
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DashBoardDistributeForm;
