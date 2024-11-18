import { Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';
import axiosInstance from '../../../axios-instance';
import mobileWidth from '../../../css-and-material/is-device';
import { styles02 } from '../../../css-and-material/styles-02';
import votingTheme from '../../../css-and-material/theme';
import { sanitizeForApi } from '../../common/sanitize';

const DashBoardDistributeForm = ({ triggerReload, userId, curentUuid, pushClickUp, getGlobal, setGlobal }) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers['X-User-ID'] = userId;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        getGlobal.curentSetOfEmails != '' &&
        getGlobal.curentSetOfEmails != ' ' &&
        getGlobal.curentSetOfEmails != '.' &&
        getGlobal.curentSetOfEmails != ','
      ) {
        const response = await axiosInstance.post('/api/users/multiplemails', {
          lov_id: curentUuid,
          mails: getGlobal.curentSetOfEmails.split(','),
        });
        console.log(response.data);
        triggerReload();
        setGlobal('curentSetOfEmails', '');
      }
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  const handleSubmitNewList = async (e) => {
    e.preventDefault();
    try {
      console.log(sanitizeForApi(getGlobal.nameOfNewSetOfEmails));
      if (
        getGlobal.curentSetOfEmails != '' &&
        getGlobal.curentSetOfEmails != ' ' &&
        getGlobal.curentSetOfEmails != '.' &&
        getGlobal.curentSetOfEmails != ','
      ) {
        if (
          getGlobal.nameOfNewSetOfEmails != '' &&
          getGlobal.nameOfNewSetOfEmails != ' ' &&
          getGlobal.nameOfNewSetOfEmails != '.' &&
          getGlobal.nameOfNewSetOfEmails != ','
        ) {
          const response = await axiosInstance.post('/api/users/nevSetOfMails', {
            lov_id: curentUuid,
            nameOfSet: sanitizeForApi(getGlobal.nameOfNewSetOfEmails),
            mails: getGlobal.curentSetOfEmails.split(','),
          });
          console.log(response.data);
          triggerReload();
          setGlobal('nameOfNewSetOfEmails', '');
        }
      }
    } catch (error) {
      console.error('Error:', error.response.data);
    }
    setGlobal('nameOfNewSetOfEmails', '');
    setGlobal('saveModalButtonClicked', false);
  };

  const handleChange2 = (e) => {
    setGlobal('curentSetOfEmails', sanitizeForApi(e.target.value));
  };

  const handleChangeNewNameOfMailSet = (e) => {
    setGlobal('nameOfNewSetOfEmails', sanitizeForApi(e.target.value));
  };

  const clearTextArea = () => {
    setGlobal('curentSetOfEmails', '');
  };

  const handleModalForSavingOn = () => {
    setGlobal('saveModalButtonClicked', true);
  };

  const handleModalForSavingOff = async () => {
    setGlobal('saveModalButtonClicked', false);
  };

  const handleLoadClick = () => {
    pushClickUp(true);
  };

  // breakpoint
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  return (
    <>
      <div style={getGlobal.saveModalButtonClicked ? styles02.modalSaveVisible : styles02.modalSaveHidden}>
        <div style={styles02.nameOfItemOnModalNest}>
          {/* <h3 style={styles02.nameOfItemOnModal}>{currentItem}</h3> */}
          <div style={styles02.buttonNest01}>
            <Box sx={{ width: '100%' }} borderRadius="10px" bgcolor="white" border="1px solid #ccc" p={2}>
              <form onSubmit={handleSubmitNewList} style={{ width: '100%' }}>
                <div style={{ width: '100%', display: 'flex' }}>
                  <div style={{ width: '100%' }}>
                    <Typography sx={votingTheme.typography.formDescription}>The name of the new list</Typography>
                    <input
                      style={{ width: '100%' }}
                      type="text"
                      name="name"
                      placeholder="Enter Input"
                      value={getGlobal.nameOfNewSetOfEmails}
                      onChange={handleChangeNewNameOfMailSet}
                    />
                  </div>
                  <div style={{ width: '30px' }}></div>
                  <div>
                    <Button type="submit" variant="contained">
                      SAVE
                    </Button>
                  </div>
                </div>
              </form>
            </Box>
          </div>
          <div style={styles02.buttonNest01}>
            <Button onClick={handleModalForSavingOff}>Return</Button>
          </div>
        </div>
      </div>
      <div style={styles02.separatorHigh}></div>
      <div style={styles02.floatedHidden}></div>
      <div style={styles02.desktopFormContainerVisible}>
        <div style={{ height: '40%' }}></div>
        <div style={styles02.modalInnerDivDesk}>
          <Box borderRadius="10px" bgcolor="white" border="1px solid #ccc" p={2}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ width: '100%' }}>
                  <Typography sx={votingTheme.typography.formDescription}>Email addreses</Typography>
                  <textarea
                    style={{ width: '100%', overflowY: 'auto' }}
                    rows={isMobile ? 24 : 8} // Specifies the number of visible text lines
                    cols={150} // Specifies the width of the textarea in characters
                    value={getGlobal.curentSetOfEmails} // Specifies the initial value of the textarea
                    placeholder="Enter Input" // Specifies a short hint that describes the expected value of the textarea
                    wrap="soft" // Specifies how the text in the textarea should be wrapped
                    readOnly={false} // Specifies that the textarea is read-only, meaning the user cannot modify its content
                    name="mailAddresses" // Specifies the name of the textarea, which can be used when submitting a form
                    disabled={false} //  Specifies that the textarea is disabled, meaning the user cannot interact with it
                    minLength={15} // Specifies the minimum number of characters required in the textarea
                    maxLength={20000} // Specifies the maximum number of characters allowed in the textarea
                    onChange={handleChange2}
                  />
                </div>
                <div
                  style={{
                    width: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                ></div>
                <div>
                  <div>
                    <Button type="submit" variant="contained">
                      SEND
                    </Button>
                  </div>
                  <div>
                    <Button onClick={clearTextArea} variant="contained">
                      CLEAR
                    </Button>
                  </div>
                  <div>
                    <Button onClick={handleModalForSavingOn} variant="contained">
                      SAVE
                    </Button>
                  </div>
                  <div style={isMobile ? styles02.visibleButton20 : styles02.hiddenList20}>
                    <Button onClick={handleLoadClick} variant="contained">
                      LOAD
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Box>
        </div>
      </div>
    </>
  );
};

export default DashBoardDistributeForm;
