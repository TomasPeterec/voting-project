import { useMediaQuery, Button, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DEditItem from './d-edit-item';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext'; // Import the useAuth hook
import mobileWidth from '../../../css-and-material/is-device';
import { styles02 } from '../../../css-and-material/styles-02';
import votingTheme from '../../../css-and-material/theme';
import { ifExistDeleteFromArrayOfObjects, testIfItExists } from '../../common/already-exist';
import { sanitizeForApi } from '../../common/sanitize';
import { useMainContext } from '../../../contexts/useMainContext';
import { useLocation } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_ROOT_VAR;

const DashBoardEditItems = ({ reload, arrHandler }) => {
  const location = useLocation();
  const { currentItem, currentId } = location.state;
  const { appState, appStateSetter } = useMainContext();
  DashBoardEditItems.propTypes = {
    reload: PropTypes.bool.isRequired,
    arrHandler: PropTypes.func.isRequired,
  };

  const { idToken } = useAuth(); // Use the context to get user and token
  const [noteBelowTheInput, setNoteBelowTheInput] = useState('Required input');
  const [listOfCandidates, setListOfCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentItemLocal, setCurrentItemLocal] = useState('');
  const [currentCandidateID, setcurrentCandidateID] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [newItem, setNewItem] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [modalButtonsOn, setModalButtonsOn] = useState(false);
  const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [reloadOnchange, setReloadOnchange] = useState(0);

  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  useEffect(() => {
    const fetchVotingTemplate = async () => {
      if (idToken) {
        try {
          setLoading(true);

          const response = await axios.get(`${apiUrl}/api/listOfVotings/template`, {
            params: {
              id: currentId, // Pridanie ID ako query parameter
            },
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          setListOfCandidates(response.data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchVotingTemplate();
  }, [reload, reloadOnchange]);

  const handleButtonsModal = (itemIdentificators) => {
    setcurrentCandidateID(itemIdentificators.currentCandidateId);
    setCurrentItemLocal(itemIdentificators.currentItem);
    setCurrentDescription(itemIdentificators.currentDescription);
    setModalButtonsOn(true);
  };

  const handleDeleteItemModal = (itemIdentificators) => {
    hideModalButtons();
    setModalDeleteConfirmation(true);
    setcurrentCandidateID(itemIdentificators.currentCandidateId);
    setCurrentItemLocal(itemIdentificators.currentItem);
    setCurrentDescription(itemIdentificators.currentDescription);
  };

  const handleDeleteItemModalFromModal = (itemIdentificators) => {
    hideModalButtons();
    setModalDeleteConfirmation(true);
    setCurrentItemLocal(itemIdentificators.currentItem);
    setCurrentDescription(itemIdentificators.currentDescription);
  };

  const handleEditItemModal = (itemIdentificators) => {
    hideModalButtons();
    setModalEdit(true);
    setCurrentItemLocal(itemIdentificators.currentItem);
    setCurrentDescription(itemIdentificators.currentDescription);
    //setNewItem(itemIdentificators.currentItem);
    setcurrentCandidateID(itemIdentificators.currentCandidateId);
    setNewDescription(itemIdentificators.currentDescription);
  };

  const handleEditItemModalFromModal = (itemIdentificators) => {
    hideModalButtons();
    setModalEdit(true);
    setCurrentItemLocal(itemIdentificators.currentItem);
    setCurrentDescription(itemIdentificators.currentDescription);
    //setNewItem(itemIdentificators.currentItem);
    setNewDescription(itemIdentificators.currentDescription);
  };

  const hideModalButtons = () => setModalButtonsOn(false);
  const hideDeleteConfirmation = () => setModalDeleteConfirmation(false);
  const hideEditModal = () => setModalEdit(false);

  const deletePermanently = async (item) => {
    if (idToken) {
      const newListArray = ifExistDeleteFromArrayOfObjects(listOfCandidates, 'title', item);
      try {
        await axios.delete(`${apiUrl}/api/listOfVotings/${currentId}/candidates/${currentCandidateID}`, {
          headers: {
            Authorization: `Bearer ${idToken}`, // Include the authorization header
          },
        });
        //setListOfCandidates(newListArray);
        setCurrentItemLocal('');
        setCurrentDescription('');
        setReloadOnchange(reloadOnchange + 1);
      } catch (error) {
        console.error('Error deleting item:', error);
      } finally {
        setModalDeleteConfirmation(false);
      }
    }
  };

  const handleChange = (e) => {
    const sanitizedValue = sanitizeForApi(e.target.value);
    setNewItem(sanitizedValue);
    setNoteBelowTheInput(testIfItExists(listOfCandidates, 'title', sanitizedValue.trim()));
  };

  const handleChange2 = (e) => setNewDescription(sanitizeForApi(e.target.value));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      noteBelowTheInput !== 'Such name of item is already in the list' &&
      newItem.trim() &&
      ![' ', '.', ','].includes(newItem)
    ) {
      if (idToken) {
        try {
          await axios.put(
            `${apiUrl}/api/listOfVotings/${currentId}/candidates/${currentCandidateID}`,
            {
              title: newItem.trim(),
              description: newDescription.trim(),
            },
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            },
          );
          setCurrentItemLocal(newItem.trim());
          setCurrentDescription(newDescription.trim());
          setReloadOnchange(reloadOnchange + 1);
          setListOfCandidates((prev) =>
            prev.map((candidate) =>
              candidate.title === currentItemLocal
                ? { ...candidate, title: newItem, description: newDescription }
                : candidate,
            ),
          );
        } catch (error) {
          console.error('Error updating item:', error);
        } finally {
          hideEditModal();
        }
      }
    }
  };

  return (
    <>
      {/* Modal for buttons */}
      <div
        style={
          isMobile
            ? modalButtonsOn
              ? styles02.displayed
              : styles02.desktopFormContainerHidden
            : styles02.desktopFormContainerHidden
        }
      >
        <div style={styles02.nameOfItemOnModalNest}>
          <h3 style={styles02.nameOfItemOnModal}>{currentItemLocal}</h3>
          <div style={styles02.buttonNest01}>
            {/* <Link to="/votings/edit" state={{ currentItemLocal, currentDescription }}> */}
            <Button onClick={() => handleEditItemModalFromModal({ currentItemLocal, currentDescription })}>Edit</Button>
            {/* </Link> */}
            <Button onClick={() => handleDeleteItemModalFromModal({ currentItemLocal, currentDescription })}>
              Delete
            </Button>
          </div>
          <Button onClick={hideModalButtons}>Return</Button>
        </div>
      </div>

      {/* Modal for delete confirmation */}
      <div style={modalDeleteConfirmation ? styles02.displayed : styles02.desktopFormContainerHidden}>
        <div style={styles02.nameOfItemOnModalNest}>
          <h3 style={styles02.nameOfItemOnModal}>{currentItemLocal}</h3>
          <Button onClick={() => deletePermanently(currentItemLocal)}>Confirm Delete</Button>
          <Button onClick={hideDeleteConfirmation}>Return</Button>
        </div>
      </div>

      {/* Modal for editing */}
      <div style={modalEdit ? styles02.displayed : styles02.desktopFormContainerHidden}>
        <div style={styles02.nameOfItemOnModalNest}>
          <h3 style={styles02.nameOfItemOnModal}>{currentItemLocal}</h3>
          <Box borderRadius="10px" bgcolor="white" border="1px solid #ccc" p={2}>
            <form onSubmit={handleSubmit}>
              <Typography sx={votingTheme.typography.formDescription}>The name of the new choice</Typography>
              <input
                style={{ width: '100%' }}
                type="text"
                value={newItem}
                onChange={handleChange}
                placeholder={currentItemLocal}
              />
              <Typography sx={votingTheme.typography.inputRequired}>{noteBelowTheInput}</Typography>
              <Typography sx={votingTheme.typography.formDescription}>The description of the new choice</Typography>
              <textarea
                style={{ width: '100%' }}
                rows={4}
                value={newDescription}
                onChange={handleChange2}
                placeholder="Enter Input"
              />
              <Button type="submit" variant="contained">
                Change
              </Button>
            </form>
          </Box>
          <Button onClick={hideEditModal}>Return</Button>
        </div>
      </div>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul style={styles02.listOfItems}>
            {listOfCandidates
              .slice()
              .reverse()
              .map((vote, index) => (
                <li key={index}>
                  <DEditItem
                    currentItem={vote.name}
                    currentCandidateId={vote.candidate_id}
                    handleButtonsModal={handleButtonsModal}
                    handleDeleteItemModal={handleDeleteItemModal}
                    handleEditItemModal={handleEditItemModal}
                    currentItemLocal={vote.title}
                    currentDescription={vote.description}
                  />
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DashBoardEditItems;
