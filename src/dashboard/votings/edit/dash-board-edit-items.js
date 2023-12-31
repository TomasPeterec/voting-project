import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DEditItem from './d-edit-item'
import mobileWidth from '../../../css-and-material/is-device'
import axiosInstance from '../../../axios-instance'
import { styles02 } from '../../../css-and-material/styles-02'
import { useMediaQuery, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { ifExistDeleteFromArrayOfObjects } from '../../common/already-exist'

const DashBoardEditItems = ({ userId, reload, curentVotingId, arrHandler }) => {
  DashBoardEditItems.propTypes = {
    userId: PropTypes.string.isRequired,
    reload: PropTypes.bool.isRequired
  }

  const [listOfCandidates, setListOfCandidates] = useState(null)
  const [loading, setLoading] = useState(true)

  const [currentItem, setCurrentItem] = useState('')
  const [currentId, setCurrentId] = useState('')
  const [modalButtonsOn, setModalButtonsOn] = useState(false)
  const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState(false)

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
    setCurrentId(itemIdentificators.currentId)
    setModalButtonsOn(true)
  }

  const handleDeleteItemModal = (itemIdentificators) => {
    hideModalButtons()
    setModalDeleteConfirmation(true)
    setCurrentItem(itemIdentificators.currentItem)
    setCurrentId(itemIdentificators.currentId)
  }

  const hideModalButtons = () => {
    setModalButtonsOn(false)
  }

  const hideDeleteConfirmation = () => {
    setModalDeleteConfirmation(false)
  }

  const deletePermanently = (item) => {
    deleteVotings(item)
    setModalDeleteConfirmation(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before starting the operation
        setLoading(true)

        // api-endpoint for serving the items
        const response = await axiosInstance.get(`/api/listOfVotings/template/${curentVotingId}`)
        const data = response.data
        // Set data and loading to false when the operation is complete
        setListOfCandidates(data)
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

    // Dependency array includes 'setLoading, setListOfCandidates'
  }, [setLoading, setListOfCandidates, reload, currentItem])

  const deleteVotings = async (item) => {
    const newListArray = ifExistDeleteFromArrayOfObjects(listOfCandidates, 'title', item)

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
      setCurrentId('')
    } catch (error) {
      console.error('Error deleting item data:', error)
    }
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
            <Link to="/votings/edit" state={{ currentItem, currentId }}>
              <Button>Edit</Button>
            </Link>
            <Button onClick={() => handleDeleteItemModal({ currentItem, currentId })}>Delete</Button>
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

      <div>
        {loading ? (
          // Render the loader when loading is true
          <p>Loading...</p>
        ) : (
          // Render component content when loading is false
          <div>
            <ul style={styles02.listOfItems}>
              {listOfCandidates
                .slice()
                .reverse()
                .map((vote, index) => (
                  <li key={index}>
                    {
                      <DEditItem
                        handleButtonsModal={handleButtonsModal}
                        handleDeleteItemModal={handleDeleteItemModal}
                        currentItem={vote.title}
                        currentId={vote.description}
                        curentDescription={vote.description}
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

export default DashBoardEditItems
