import React from 'react'
import { Box, useMediaQuery, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import mobileWidth from '../../css-and-material/is-device'

const DVotingItem = ({
  currentItem,
  currentId,
  handleButtonsModal,
  handleDeleteItemModal
}) => {
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
        <Box
          style={{ display: 'flex', alignItems: 'center', height: '30px' }}
          borderRadius="10px"
          border="1px solid #ccc"
          p={'10px'}
          onClick={onClick}
        >
          <div style={{ width: '99%', display: 'flex' }}>
            <div style={{ width: '55px' }}>Status</div>
            {currentItem}
          </div>
          <div
            style={{ width: '1%', display: 'flex', justifyContent: 'flex-end' }}
          >
            {isMobile
              ? (
              <></>
                )
              : (
              <div style={{ display: 'flex' }}>
                <Link
                  to="/votings/distribution"
                  state={{ currentItem, currentId }}
                >
                  <Button>Distr</Button>
                </Link>
                <Link
                  to="/votings/statistics"
                  state={{ currentItem, currentId }}
                >
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
