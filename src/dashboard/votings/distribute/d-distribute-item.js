import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import mobileWidth from '../../../css-and-material/is-device'
import { styles02 } from '../../../css-and-material/styles-02'
import { Typography } from '@mui/material'
import votingTheme from '../../../css-and-material/theme'

const DDistributeItem = ({
  currentItem,
  currentId,
  curentEmails,
  handleButtonsModal,
  handleDeleteItemModal,
  handleEditItemModal,
  handleLoadModal,
  handleEmails2,
  // getGlobal,
  setGlobal
}) => {
  // Breakpoint definition
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`)

  // Handlers of modal window
  const showModalButtons = () => {
    handleButtonsModal({ currentItem, currentId })
    handleEmails2(curentEmails, currentItem)
  }

  const deleteItem = () => {
    handleDeleteItemModal({ currentItem, currentId })
  }

  const editItem = () => {
    let newTextValue = ''
    for (let i = 0; i < curentEmails.length; i++) {
      if (i > 0) {
        newTextValue = newTextValue + ', '
      }
      newTextValue = newTextValue + '"' + curentEmails[i].name + '" <' + curentEmails[i].mail + '>'
    }

    handleEditItemModal({ currentItem, curentEmails })

    setGlobal('displayedListOfEmails', newTextValue)
  }

  const loadToParent = () => {
    handleLoadModal({ currentItem, curentEmails })
    setGlobal('curentItem', currentItem)
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
                    <button
                      style={{
                        height: '38px',
                        width: '38px',
                        borderWidth: '0px',
                        padding: '0',
                        backgroundColor: 'white',
                        borderRadius: '19px'
                      }}
                      onClick={loadToParent}
                    >
                      <div style={styles02.rounderFrame}>LOAD</div>
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
                        borderRadius: '19px'
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
        </Box>
      </>
    )
  }

  return <>{isMobile ? <MyBox onClick={showModalButtons} /> : <MyBox />}</>
}

export default DDistributeItem
