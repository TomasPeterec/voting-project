import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DDistributeItem from './d-distribute-item'
import mobileWidth from '../../../css-and-material/is-device'
import axiosInstance from '../../../axios-instance'
import { styles02 } from '../../../css-and-material/styles-02'
import { useMediaQuery, Button, Box } from '@mui/material'
import { Typography } from '@mui/material'
import votingTheme from '../../../css-and-material/theme'
import { Link } from 'react-router-dom'
import { sanitizeForApi } from '../../common/sanitize'
import { testIfItExists } from '../../common/already-exist'
import { ifExistDeleteFromArrayOfObjects } from '../../common/already-exist'

const DashBoardDistributeItems = ({
  userId,
  reload,
  curentVotingId,
  arrHandler,
  handleEmails,
  parentClick,
  changeParentClick,
  handleEmails2,
  setGlobal,
  getGlobal
}) => {
  DashBoardDistributeItems.propTypes = {
    userId: PropTypes.string.isRequired,
    reload: PropTypes.bool.isRequired
  }

  const [noteBelowTheInput, setNoteBelowTheInput] = useState('Required input')
  const [listsOfEmails, setListsOfEmails] = useState(null)
  const [loading, setLoading] = useState(true)

  const [currentItem, setCurrentItem] = useState('')
  const [curentEmails, setCurentEmails] = useState('')
  const [newItem, setNewItem] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [modalButtonsOn, setModalButtonsOn] = useState(false)
  const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)

  // adding of interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers['X-User-ID'] = userId
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Breakpoint definition
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`)

  const handleButtonsModal = (itemIdentificators) => {
    setCurrentItem(itemIdentificators.currentItem)
    setCurentEmails(itemIdentificators.curentEmails)
    changeParentClick()
  }

  const handleDeleteItemModal = (itemIdentificators) => {
    hideModalButtons()
    setModalDeleteConfirmation(true)
    setCurrentItem(itemIdentificators.currentItem)
    setCurentEmails(itemIdentificators.curentEmails)
  }

  const handleEditItemModal = (itemIdentificators) => {
    hideModalButtons()
    setModalEdit(true)
    setCurrentItem(itemIdentificators.currentItem)
    setCurentEmails(itemIdentificators.curentEmails)

    setNewItem(itemIdentificators.currentItem)
    setNewDescription(itemIdentificators.curentEmails)
  }

  const hideModalButtons = () => {
    setModalButtonsOn(false)
  }

  const hideDeleteConfirmation = () => {
    setModalDeleteConfirmation(false)
  }

  const hideEditModal = () => {
    setModalEdit(false)
  }

  const deletePermanently = (item) => {
    deleteVotings(item)
    setModalDeleteConfirmation(false)
  }

  const handleChange = (e) => {
    setNewItem(sanitizeForApi(e.target.value))
    setNoteBelowTheInput(testIfItExists(listsOfEmails, 'title', sanitizeForApi(e.target.value).trim()))
  }

  const handleChange2 = (e) => {
    // setNewDescription(sanitizeForApi(e.target.value))
    setGlobal('displayedListOfEmails', e.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before starting the operation
        setLoading(true)

        // api-endpoint for serving the items
        const response = await axiosInstance.get('/api/users/mails/')
        const data = response.data

        // Set data and loading to false when the operation is complete
        setListsOfEmails(data)
        setLoading(false)
        arrHandler(data)
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    // Call the fetchData function
    fetchData()

    // Dependency array includes 'setLoading, setListsOfEmails'
  }, [setLoading, setListsOfEmails, reload, currentItem, curentEmails])

  const deleteVotings = async (item) => {
    const newListArray = ifExistDeleteFromArrayOfObjects(listsOfEmails, 'title', item)

    try {
      // api-endpoint for deleting the item
      const response = await axiosInstance.put('/api/listOfVotings/template/delete', {
        lov_id: curentVotingId,
        template: newListArray
      })

      if (response.status === 200) {
        const data = response.data
        // Perform actions with the data
        console.log('Delete request successful:', data)
      }
      setCurrentItem('')
      setCurentEmails('')
    } catch (error) {
      console.error('Error deleting item data:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(newDescription)
    const response = await axiosInstance.put('/api/listOfVotings/template/change', {
      lov_id: curentVotingId,
      oldTitle: currentItem,
      title: newItem.trim(),
      description: getGlobal.displayedListOfEmails.trim()
    })

    console.log(getGlobal.displayedListOfEmails)
    console.log('response data: ' + response.data)

    // try {
    //   if (newItem != '' && newItem != ' ' && newItem != '.' && newItem != ',') {
    //     const response = await axiosInstance.put('/api/listOfVotings/template/change', {
    //       lov_id: curentVotingId,
    //       oldTitle: currentItem,
    //       title: newItem.trim(),
    //       description: newDescription.trim()
    //     })
    //     // console.log('response data: ' + response.data)
    //     console.log('response data: ' + response)
    //     setCurrentItem(newItem.trim())
    //     setCurentEmails(newDescription.trim())
    //   }
    // } catch (error) {
    //   // console.error('Error:', error.response.data)
    //   console.error('Error:', error.response)
    // }
    hideEditModal()
  }

  const handleLoadModal = ({ currentItem, curentEmails }) => {
    setCurrentItem(currentItem)
    setCurentEmails(curentEmails)
    handleEmails(curentEmails, currentItem)
  }

  return (
    <>
      {/* Definition of modal window for buttons */}
      <div
        style={
          isMobile
            ? !modalButtonsOn
              ? styles02.desktopFormContainerHidden
              : styles02.displayed
            : styles02.desktopFormContainerHidden
        }
      >
        <div style={styles02.nameOfItemOnModalNest}>
          <h3 style={styles02.nameOfItemOnModal}>{currentItem}</h3>
          <div style={styles02.buttonNest01}>
            <Button onClick={() => handleLoadModal({ currentItem, curentEmails })}>Load</Button>
            <Link to="/votings/edit" state={{ currentItem, curentEmails }}>
              <Button>Save</Button>
            </Link>
            <Link to="/votings/edit" state={{ currentItem, curentEmails }}>
              <Button>Edit</Button>
            </Link>
            <Button onClick={() => handleDeleteItemModal({ currentItem, curentEmails })}>Delete</Button>
          </div>
          <div style={styles02.buttonNest01}>
            <Button onClick={hideModalButtons}>Return</Button>
          </div>
        </div>
      </div>
      {/* Definition of modal window for confirmation of deleting a item */}
      <div style={!modalDeleteConfirmation ? styles02.desktopFormContainerHidden : styles02.displayed}>
        <div style={styles02.nameOfItemOnModalNest}>
          <h3 style={styles02.nameOfItemOnModal}>{currentItem}</h3>
          <div style={styles02.buttonNest01}>
            <Button onClick={() => deletePermanently(currentItem)}>Confirm delete</Button>
          </div>
          <div style={styles02.buttonNest01}>
            <Button onClick={hideDeleteConfirmation}>Return</Button>
          </div>
        </div>
      </div>
      <div style={!modalEdit ? styles02.desktopFormContainerHidden : styles02.displayed}>
        <div style={styles02.nameOfItemOnModalNest}>
          <h3 style={styles02.nameOfItemOnModal}>{currentItem}</h3>
          <div style={styles02.buttonNest01}>
            <Box borderRadius="10px" bgcolor="white" border="1px solid #ccc" p={2}>
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div style={{ width: '100%', display: 'flex' }}>
                  <div style={{ width: '100%' }}>
                    <Typography sx={votingTheme.typography.formDescription}>The name of the new choice</Typography>
                    <input
                      style={{ width: '100%' }}
                      type="text"
                      name="name"
                      placeholder="Enter Input"
                      value={newItem}
                      onChange={handleChange}
                    />
                    <Typography sx={votingTheme.typography.inputRequired}>{noteBelowTheInput}</Typography>
                    <Typography sx={votingTheme.typography.formDescription}>
                      The description of the new choice
                    </Typography>
                    <textarea
                      data-testid="mail_addreses"
                      style={{ width: '100%' }}
                      rows={4} // Specifies the number of visible text lines
                      cols={150} // Specifies the width of the textarea in characters
                      value={getGlobal.displayedListOfEmails} // Specifies the initial value of the textarea
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
                    <Button type="submit" variant="contained">
                      Change
                    </Button>
                  </div>
                </div>
              </form>
            </Box>
          </div>
          <div style={styles02.buttonNest01}>
            <Button onClick={hideEditModal}>Return 03</Button>
          </div>
        </div>
      </div>
      <div>
        {loading ? (
          // Render the loader when loading is true
          <p>Loading...</p>
        ) : (
          // Render component content when loading is false
          <div
            style={
              isMobile
                ? parentClick
                  ? styles02.modalListVisible
                  : styles02.hiddenList20
                : styles02.desktopFormContainerVisible
            }
          >
            <ul style={styles02.listOfItems}>
              {listsOfEmails
                .slice()
                .reverse()
                .map((curentEmailList, index) => (
                  <li key={index}>
                    {
                      <DDistributeItem
                        handleButtonsModal={handleButtonsModal}
                        handleDeleteItemModal={handleDeleteItemModal}
                        handleEditItemModal={handleEditItemModal}
                        currentItem={curentEmailList.name}
                        curentEmails={curentEmailList.emails}
                        handleLoadModal={handleLoadModal}
                        handleEmails2={handleEmails2}
                        getGlobal={getGlobal}
                        setGlobal={setGlobal}
                      />
                    }
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default DashBoardDistributeItems
