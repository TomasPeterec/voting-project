import { Box, useMediaQuery, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import mobileWidth from '../../../css-and-material/is-device';
import { styles02 } from '../../../css-and-material/styles-02';
import votingTheme from '../../../css-and-material/theme';
import { ReactComponent as IDeleteDef } from '../../../img/i_delete_default.svg';
import { ReactComponent as IDeleteDis } from '../../../img/i_delete_disabled.svg';
import { ReactComponent as IDistributeDef } from '../../../img/i_distribute_default.svg';
import { ReactComponent as IDistributeDis } from '../../../img/i_distribute_disabled.svg';
import { ReactComponent as IDraft } from '../../../img/i_draft_negative.svg';
import { ReactComponent as IEditDef } from '../../../img/i_edit_defaul.svg';
import { ReactComponent as IEditDis } from '../../../img/i_edit_disabled.svg';
import { ReactComponent as IStatisticsDef } from '../../../img/i_statistics_defaul.svg';
import { ReactComponent as IStatisticsDis } from '../../../img/i_statistics_disabled.svg';
import { useMainContext } from '../../../contexts/useMainContext';

const DVotingItem = ({ currentItem, currentId, handleButtonsModal, handleDeleteItemModal }) => {
  const { appState, appStateSetter } = useMainContext();

  // Breakpoint definition
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  // Handlers of modal window
  const showModalButtons = () => {
    handleButtonsModal({ currentItem, currentId });
  };

  const deleteItem = () => {
    handleDeleteItemModal({ currentItem, currentId });
  };

  // Handler to update state before navigation
  const handleEditClick = () => {
    appStateSetter('chosenVotesId', currentId);
    appStateSetter('chosenVotesName', currentItem);
  };

  const handleDIstributeClick = () => {
    appStateSetter('chosenVotesId', currentId);
    appStateSetter('chosenVotesName', currentItem);
    console.log(currentItem);
  };

  // Definition of an item in Votings list
  const MyBox = ({ onClick }) => {
    return (
      <>
        <Box style={styles02.itemStyle} borderRadius="24px" border="1px solid #e0e0e0" p={'0px'} onClick={onClick}>
          <div style={styles02.nameOfCurentItem}>
            <div style={styles02.statusNest}>
              <div style={styles02.rounderNoFrame}>
                <IDraft style={styles02.rowIcone} />
              </div>
            </div>
            <Typography sx={votingTheme.typography.titleOfItem}>{currentItem}</Typography>
          </div>
          <div style={styles02.buttonsAlignedToRight}>
            {isMobile ? (
              <></>
            ) : (
              <div style={styles02.itemRow}>
                <div style={styles02.roundButonNest}>
                  <div onClick={handleDIstributeClick} style={{ display: 'inline-block' }}>
                    <Link to="/votings/distribution" state={{ currentItem, currentId }}>
                      <div style={styles02.rounderFrame}>
                        <IDistributeDef style={styles02.rowIcone} />
                      </div>
                    </Link>
                  </div>
                </div>
                <div style={styles02.roundButonNest}>
                  <Link to="/votings/dashboard" state={{ currentItem, currentId }}>
                    <div style={styles02.rounderFrame}>
                      <IStatisticsDef style={styles02.rowIcone} />
                    </div>
                  </Link>
                </div>
                <div style={styles02.roundButonNest}>
                  <div onClick={handleEditClick} style={{ display: 'inline-block' }}>
                    <Link to="/votings/edit" state={{ currentItem, currentId }}>
                      <div style={styles02.rounderFrame}>
                        <IEditDef style={styles02.rowIcone} />
                      </div>
                    </Link>
                  </div>
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
                    <div style={styles02.rounderFrame}>
                      <IDeleteDef style={{ height: '100%', width: '100%' }} />
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </Box>
      </>
    );
  };

  return <>{isMobile ? <MyBox onClick={showModalButtons} /> : <MyBox />}</>;
};

export default DVotingItem;
