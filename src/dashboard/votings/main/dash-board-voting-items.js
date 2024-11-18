import { useMediaQuery, Button, Snackbar } from '@mui/material';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DVotingItem from './d-voting-item';
import { useAuth } from '../../../contexts/AuthContext';
import mobileWidth from '../../../css-and-material/is-device';
import { modalWindowsStyles } from '../../../css-and-material/modalWindowsStyles';
import { styles02 } from '../../../css-and-material/styles-02';
import firebaseConfig from '../../../firebaseConfig';
import { ReactComponent as IDeleteDef } from '../../../img/i_delete_default.svg';
import { ReactComponent as IDistributeDef } from '../../../img/i_distribute_default.svg';
import { ReactComponent as IEditDef } from '../../../img/i_edit_defaul.svg';
import { ReactComponent as IStatisticsDef } from '../../../img/i_statistics_defaul.svg';

initializeApp(firebaseConfig);
const apiUrl = process.env.REACT_APP_API_ROOT_VAR;

const DashBoardVotingItems = ({ userId, reload, arrHandler }) => {
  const { idToken } = useAuth(); // Use the context to get and token
  const [listOfVotes, setListOfVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [modalButtonsOn, setModalButtonsOn] = useState(false);
  const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState(false);
  const [error, setError] = useState(null);
  const [returnIsHovered, setReturnIsHovered] = useState(false);
  const [deleteIsHovered, setDeleteIsHovered] = useState(false);

  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  const handleButtonsModal = ({ currentItem, currentId }) => {
    setCurrentItem(currentItem);
    setCurrentId(currentId);
    setModalButtonsOn(true);
  };

  const handleDeleteItemModal = ({ currentItem, currentId }) => {
    hideModalButtons();
    setModalDeleteConfirmation(true);
    setCurrentItem(currentItem);
    setCurrentId(currentId);
    setDeleteIsHovered(false);
    setReturnIsHovered(false);
  };

  const hideModalButtons = () => setModalButtonsOn(false);
  const hideDeleteConfirmation = () => setModalDeleteConfirmation(false);

  const localMOdalStyles = {
    ...modalWindowsStyles,
    returnButton: {
      ...modalWindowsStyles.returnButton,
      borderColor: returnIsHovered ? '#6691D9' : '#5376B1',
      color: returnIsHovered ? '#ffffff' : '#B7B7B7',
    },
    confirmDeleteButton: {
      ...modalWindowsStyles.confirmDeleteButton,
      borderColor: deleteIsHovered ? '#E40304' : '#BE2122',
      color: deleteIsHovered ? '#ffffff' : '#B7B7B7',
    },
  };

  const deletePermanently = async (itemId) => {
    if (idToken) {
      try {
        // Correctly structure the Axios DELETE request
        await axios.delete(`${apiUrl}/api/listOfVotings/delete`, {
          data: { lov_id: itemId }, // Data should be under the 'data' property
          headers: {
            Authorization: `Bearer ${idToken}`, // Include the authorization header
          },
        });
        // Update the state to remove the deleted item from the list
        setListOfVotes((prev) => prev.filter((item) => item.lov_id !== itemId));
        setModalDeleteConfirmation(false); // Close the confirmation modal
      } catch (error) {
        console.error('Error deleting item:', error); // Log the error for debugging
        setError('Failed to delete item'); // Set an error message
      }
    } else {
      console.warn('ID token is missing or invalid'); // Log if the token is not available
    }
  };

  useEffect(() => {
    const fetchList = async () => {
      if (idToken) {
        try {
          const response = await axios.get(`${apiUrl}/api/listOfVotings/subset`, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          console.log(response.data); // To confirm data structure
          setListOfVotes(response.data.results.reverse()); // Set the array correctly
        } catch (error) {
          console.error('Error fetching list of votes:', error);
          setListOfVotes([]); // Avoid issues if there's an error
        } finally {
          setLoading(false);
        }
      }
    };

    fetchList();
  }, [idToken, reload]);

  return (
    <>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)} message={error} />

      {modalButtonsOn && (
        <div style={isMobile ? styles02.displayed : styles02.desktopFormContainerHidden}>
          <div style={modalWindowsStyles.nameOfItemOnModalNest}>
            <div style={modalWindowsStyles.solidFoundation}>
              <div style={{ height: '30px' }}></div>
              <p style={modalWindowsStyles.modalMessage}>Choose an action for the item</p>
              <h3 style={modalWindowsStyles.modalHeader}>{currentItem}</h3>
              <div style={styles02.buttonNest01}>
                <Link to="/votings/dashboard" state={{ currentItem, currentId }}>
                  {/* <Link to="/votings/distribution" state={{ currentItem, currentId }}>*/}
                  <IDistributeDef style={modalWindowsStyles.modalRowIcone} />
                </Link>
                <Link to="/votings/dashboard" state={{ currentItem, currentId }}>
                  {/* <Link to="/votings/statistics" state={{ currentItem, currentId }}>*/}
                  <IStatisticsDef style={modalWindowsStyles.modalRowIcone} />
                </Link>
                <Link to="/votings/dashboard" state={{ currentItem, currentId }}>
                  {/* <Link to="/votings/edit" state={{ currentItem, currentId }}>*/}
                  <IEditDef style={modalWindowsStyles.modalRowIcone} />
                </Link>
                <button
                  style={modalWindowsStyles.invisibleNostyle}
                  onClick={() => handleDeleteItemModal({ currentItem, currentId })}
                >
                  <IDeleteDef style={modalWindowsStyles.modalRowIcone} />
                </button>
              </div>
              <div style={styles02.buttonNest01}>
                <Button
                  style={localMOdalStyles.returnButton}
                  onMouseEnter={() => setReturnIsHovered(true)} // Set hover state to true
                  onMouseLeave={() => setReturnIsHovered(false)} // Set hover state to false
                  onClick={hideModalButtons}
                >
                  Return
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalDeleteConfirmation && (
        <div style={modalWindowsStyles.nameOfItemOnModalNest}>
          <div style={modalWindowsStyles.solidFoundation}>
            <div style={{ height: '22px' }}></div>
            <p style={modalWindowsStyles.modalMessage}>
              This action will permanently
              <br />
              delete item with name
            </p>
            <h3 style={modalWindowsStyles.modalHeader}>{currentItem}</h3>
            <div style={modalWindowsStyles.automaticRow}>
              <Button
                onMouseEnter={() => setDeleteIsHovered(true)} // Set hover state to true
                onMouseLeave={() => setDeleteIsHovered(false)} // Set hover state to false
                style={localMOdalStyles.confirmDeleteButton}
                onClick={() => deletePermanently(currentId)}
              >
                <strong>Confirm delete</strong>
              </Button>
              <div style={{ width: '20px' }}></div>
              <Button
                onMouseEnter={() => setReturnIsHovered(true)} // Set hover state to true
                onMouseLeave={() => setReturnIsHovered(false)} // Set hover state to false
                style={localMOdalStyles.returnButton}
                onClick={hideDeleteConfirmation}
              >
                <strong>Return</strong>
              </Button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={styles02.listOfItems}>
          {listOfVotes.map((vote, index) => (
            <li key={index}>
              <DVotingItem
                handleButtonsModal={handleButtonsModal}
                handleDeleteItemModal={handleDeleteItemModal}
                currentItem={vote.name_of_voting}
                currentId={vote.lov_id}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

DashBoardVotingItems.propTypes = {
  userId: PropTypes.string.isRequired,
  reload: PropTypes.bool.isRequired,
  arrHandler: PropTypes.func.isRequired,
};

export default DashBoardVotingItems;
