import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import mobileWidth from '../../../css-and-material/is-device'
import { styles02 } from '../../../css-and-material/styles-02'
import { Typography } from '@mui/material'
import votingTheme from '../../../css-and-material/theme'

const DEditItem = ({ currentItem, currentId, curentDescription, handleButtonsModal, handleDeleteItemModal }) => {
  // Breakpoint definition
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`)

  // Handlers of modal window
  const showModalButtons = () => {
    handleButtonsModal({ currentItem, currentId })
  }

  const deleteItem = () => {
    handleDeleteItemModal({ currentItem, currentId })
  }

  // Definition of an item in Votings list
  const MyBox = ({ onClick }) => {
    return (
      <>
        <Box style={styles02.itemStyle2} borderRadius="24px" border="1px solid #e0e0e0" p={'0px'} onClick={onClick}>
          <div style={{ height: '48px', width: '100%', display: 'flex', alignItems: 'center' }}>
            <div style={styles02.nameOfCurentItem}>
              <div style={styles02.textFromLeft}></div>
              <Typography sx={votingTheme.typography.titleOfItem}>{currentItem}</Typography>
            </div>
            <div style={styles02.buttonsAlignedToRight}>
              {isMobile ? (
                <></>
              ) : (
                <div style={styles02.itemRow}>
                  <div style={styles02.roundButonNest}>
                    <Link to="/votings/edit" state={{ currentItem, currentId }}>
                      <div style={styles02.rounderFrame}>EDI</div>
                    </Link>
                  </div>
                  <div style={styles02.roundButonNest}>
                    <button
                      style={{
                        height: '38px',
                        width: '38px',
                        borderWidth: '0px',
                        padding: '0',
                        backgroundColor: 'white',
                        borderRadius: '19px'
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
          <Typography
            sx={votingTheme.typography.descriptionOfItem}
            style={{ width: '100%', marginLeft: '24px', marginBottom: '10px' }}
          >
            {curentDescription}
          </Typography>
        </Box>
      </>
    )
  }

  return <>{isMobile ? <MyBox onClick={showModalButtons} /> : <MyBox />}</>
}

export default DEditItem
