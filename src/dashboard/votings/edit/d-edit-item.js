import { Box, useMediaQuery, Typography } from '@mui/material';
import React from 'react';
import mobileWidth from '../../../css-and-material/is-device';
import { styles02 } from '../../../css-and-material/styles-02';
import votingTheme from '../../../css-and-material/theme';
import '../../../css-and-material/candidate-items.scss'; // Adjust the path if necessary

const DEditItem = ({
  currentItem,
  currentCandidateId,
  currentDescription,
  handleButtonsModal,
  handleDeleteItemModal,
  handleEditItemModal,
}) => {
  // Breakpoint definition
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  // Handlers of modal window
  const showModalButtons = () => {
    handleButtonsModal({ currentItem, currentCandidateId, currentDescription });
  };

  const deleteItem = () => {
    handleDeleteItemModal({ currentItem, currentCandidateId, currentDescription });
  };

  const editItem = () => {
    handleEditItemModal({ currentItem, currentDescription, currentCandidateId });
  };

  // Definition of an item in Votings list
  const MyBox = ({ onClick }) => {
    return (
      <>
        <Box style={styles02.itemStyle2} borderRadius="24px" border="1px solid #e0e0e0" p={'0px'} onClick={onClick}>
          <div
            style={{
              height: '48px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={styles02.nameOfCurentItem}>
              <div style={styles02.textFromLeft}></div>
              {/* <Typography sx={votingTheme.typography.titleOfItem}>{currentItem}</Typography> */}
              <div className="inter-item-title">{currentItem}</div>
            </div>
            <div style={styles02.buttonsAlignedToRight}>
              {isMobile ? (
                <></>
              ) : (
                <div style={styles02.itemRow}>
                  <div style={styles02.roundButonNest}>
                    <button
                      style={{
                        height: '38px',
                        width: '38px',
                        borderWidth: '0px',
                        padding: '0',
                        backgroundColor: 'white',
                        borderRadius: '19px',
                      }}
                      onClick={editItem}
                    >
                      <div style={styles02.rounderFrame}>EDI</div>
                    </button>
                  </div>
                  <div style={styles02.roundButonNest}>
                    <button
                      style={{
                        height: '38px',
                        width: '38px',
                        borderWidth: '0px',
                        padding: '0',
                        backgroundColor: 'white',
                        borderRadius: '19px',
                      }}
                      onClick={deleteItem}
                    >
                      <div style={styles02.rounderFrame}>DEL</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <Typography
            sx={votingTheme.typography.descriptionOfItem}
            style={{ width: '100%', marginLeft: '24px', marginBottom: '10px' }}
          >
            {currentDescription}
          </Typography> */}
          <div className="edit-description inter-item-description">{currentDescription}</div>
        </Box>
      </>
    );
  };

  return <>{isMobile ? <MyBox onClick={showModalButtons} /> : <MyBox />}</>;
};

export default DEditItem;
