import { Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../../firebaseConfig';
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import mobileWidth from '../../../css-and-material/isDevice';
import axios from 'axios';
import { styles02 } from '../../../css-and-material/styles-02';
import votingTheme from '../../../css-and-material/theme';
import { testIfItExists } from '../../common/alreadyExist';
import { sanitizeForApi } from '../../common/sanitize';
import { useLocation } from 'react-router-dom';
import { modalWindowsStyles } from '../../../css-and-material/modalWindowsStyles';
import '../../../css-and-material/candidate-items.scss'; // Adjust the path if necessary

initializeApp(firebaseConfig);
const apiUrl = process.env.REACT_APP_API_ROOT_VAR;

const DashBoardEditForm = ({ triggerReload, arrFromItems }) => {
  const location = useLocation();
  const { currentItem, currentId } = location.state;
  const { getValidToken } = useAuth(); // Use the context to get user and token
  const [noteBelowTheInput, setNoteBelowTheInput] = useState('Required input');
  const [clicked, setClicked] = useState(false);
  const [formDataTitle, setFormDataTitle] = useState('');
  const [formDataDes, setFormDataDes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const localIdToken = await getValidToken();
    if (localIdToken) {
      try {
        if (noteBelowTheInput != 'Such name of item is already in the list') {
          if (formDataTitle != '' && formDataTitle != ' ' && formDataTitle != '.' && formDataTitle != ',') {
            const response = await axios.post(
              `${apiUrl}/api/listOfVotings/${currentId}/candidates`,
              {
                title: formDataTitle.trim(),
                description: formDataDes.trim(),
              },
              {
                headers: {
                  Authorization: `Bearer ${localIdToken}`,
                },
              },
            );
            triggerReload();
            setFormDataTitle('');
            setFormDataDes('');
          }
        }
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    }
  };

  const handleChange = (e) => {
    setFormDataTitle(sanitizeForApi(e.target.value));
    setNoteBelowTheInput(testIfItExists(arrFromItems, 'title', sanitizeForApi(e.target.value).trim()));
  };

  const handleChange2 = (e) => {
    setFormDataDes(sanitizeForApi(e.target.value));
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
      height: isMobile ? modalWindowsStyles.sendButton.height : '45%',
    },
    returnButton: {
      ...modalWindowsStyles.sendButton,
      margin: '0px',
      visibility: 'visible',
      padding: isMobile ? modalWindowsStyles.sendButton.padding : '18px',
      paddingLeft: isMobile ? modalWindowsStyles.sendButton.padding : '14px',
      paddingRight: isMobile ? modalWindowsStyles.sendButton.padding : '14px',
      height: isMobile ? modalWindowsStyles.sendButton.height : '45%',
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
    areaStyle: {
      ...modalWindowsStyles.inputStyle,
      width: '100%',
      overflowY: 'auto',
      height: isMobile ? '150px' : '100px',
      marginBottom: '0px',
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
        <div style={isMobile ? styles02.modalInnerDivMobile : styles02.modalInnerDivDesk}>
          <div style={localStyles.solidFoundation}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ width: '100%' }}>
                  <div className="inter-form-title">The name of the new choice</div>
                  <input
                    style={modalWindowsStyles.inputStyle}
                    type="text"
                    name="name"
                    placeholder="Enter Input"
                    value={formDataTitle}
                    onChange={handleChange}
                  />
                  <div className="inter-form-note">{noteBelowTheInput}</div>
                  <div className="inter-form-title">The description of the new choice</div>
                  <textarea
                    style={localStyles.areaStyle}
                    rows={4} // Specifies the number of visible text lines
                    cols={150} // Specifies the width of the textarea in characters
                    value={formDataDes} // Specifies the initial value of the textarea
                    placeholder="Enter Input" // Specifies a short hint that describes the expected value of the textarea
                    wrap="soft" // Specifies how the text in the textarea should be wrapped
                    readOnly={false} // Specifies that the textarea is read-only, meaning the user cannot modify its content
                    name="description" // Specifies the name of the textarea, which can be used when submitting a form
                    disabled={false} //  Specifies that the textarea is disabled, meaning the user cannot interact with it
                    minLength={15} // Specifies the minimum number of characters required in the textarea
                    maxLength={200} // Specifies the maximum number of characters allowed in the textarea
                    onChange={handleChange2}
                  />
                </div>
                <div style={{ width: '30px' }}></div>
                <div>
                  <Button style={localStyles.sendButton} type="submit" onClick={handleClickModalOff}>
                    PLUS
                  </Button>
                  <Button
                    style={isMobile ? localStyles.returnButton : { visibility: 'hidden' }}
                    onClick={handleClickModalOff}
                  >
                    return
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardEditForm;
