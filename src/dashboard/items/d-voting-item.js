import React from 'react'
import { Box, useMediaQuery, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import mobileWidth from '../../css-and-material/is-device'
import { styles02 } from '../../css-and-material/styles-02'

const DVotingItem = ({ currentItem, currentId, handleButtonsModal, handleDeleteItemModal }) => {
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
        <Box style={styles02.itemStyle} borderRadius="10px" border="1px solid #ccc" p={'10px'} onClick={onClick}>
          <div style={styles02.nameOfCUrentItem}>
            <div style={styles02.statusNest}>Status</div>
            {currentItem}
          </div>
          <div style={styles02.buttonsAlignedToRight}>
            {isMobile ? (
              <></>
            ) : (
              <div style={styles02.itemRow}>
                <Link to="/votings/distribution" state={{ currentItem, currentId }}>
                  <Button>Distr</Button>
                </Link>
                <Link to="/votings/statistics" state={{ currentItem, currentId }}>
                  <Button>Stats</Button>
                </Link>
                <Link to="/votings/edit" state={{ currentItem, currentId }}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={deleteItem}>Delete</Button>
              </div>
            )}
          </div>
        </Box>
      </>
    )
  }

  return <>{isMobile ? <MyBox onClick={showModalButtons} /> : <MyBox />}</>
}

export default DVotingItem
