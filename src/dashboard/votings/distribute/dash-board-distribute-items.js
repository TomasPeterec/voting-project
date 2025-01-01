import { useMediaQuery, Button, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DDistributeItem from './d-distribute-item';
import mobileWidth from '../../../css-and-material/is-device';
import { useAuth } from '../../../contexts/AuthContext'; // Import the useAuth hook
import axios from 'axios';
import { styles02 } from '../../../css-and-material/styles-02';
import votingTheme from '../../../css-and-material/theme';
import { testIfItExists, ifExistDeleteFromArrayOfObjects } from '../../common/already-exist';
import { sanitizeForApi } from '../../common/sanitize';
import { modalWindowsStyles } from '../../../css-and-material/modalWindowsStyles';
import { ReactComponent as IDeleteDef } from '../../../img/i_delete_default.svg';
import { ReactComponent as IDistributeDef } from '../../../img/i_distribute_default.svg';
import { ReactComponent as IEditDef } from '../../../img/i_edit_defaul.svg';
import { ReactComponent as IStatisticsDef } from '../../../img/i_statistics_defaul.svg';
import { ReactComponent as ISloadDef } from '../../../img/i_load_defaul.svg';

const apiUrl = process.env.REACT_APP_API_ROOT_VAR;

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
  getGlobal,
  setCurrentEmailListIdAux,
}) => {
  DashBoardDistributeItems.propTypes = {
    userId: PropTypes.string.isRequired,
    reload: PropTypes.bool.isRequired,
  };

  const [noteBelowTheInput, setNoteBelowTheInput] = useState('Required input');
  const [currentId, setCurrentId] = useState('');
  const [listsOfEmails, setListsOfEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { idToken } = useAuth(); // Use the context to get user and token
  const [currentItem, setCurrentItem] = useState('');
  const [curentEmails, setCurentEmails] = useState('');
  const [newItem, setNewItem] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [modalButtonsOn, setModalButtonsOn] = useState(false);
  const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [currentListId, setCurrentListId] = useState('');
  const [returnIsHovered, setReturnIsHovered] = useState(false);
  const [deleteIsHovered, setDeleteIsHovered] = useState(false);

  // adding of interceptor
  // axiosInstance.interceptors.request.use(
  //   (config) => {
  //     config.headers['X-User-ID'] = userId;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   },
  // );

  // Breakpoint definition
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  const handleButtonsModal = (itemIdentificators) => {
    setCurrentItem(itemIdentificators.currentItem);
    setCurrentListId(itemIdentificators.currentId);
    console.log(itemIdentificators.currentId);
    console.log(getGlobal.currentEmailListId);
    changeParentClick();
  };

  const handleDeleteItemModal = (itemIdentificators) => {
    // handleDeleteItemModal({ currentItem, currentId });
    hideModalButtons();
    setModalDeleteConfirmation(true);
    setCurrentListId(itemIdentificators.currentId);
    setCurrentItem(itemIdentificators.currentItem);
  };

  const handleEditItemModal = (itemIdentificators) => {
    hideModalButtons();
    setModalEdit(true);
    setCurrentItem(itemIdentificators.currentItem);
    setCurentEmails(itemIdentificators.curentEmails);

    setNewItem(itemIdentificators.currentItem);
    setNewDescription(itemIdentificators.curentEmails);
  };

  const hideModalButtons = () => {
    setModalButtonsOn(false);
  };

  const hideDeleteConfirmation = () => {
    setModalDeleteConfirmation(false);
  };

  const hideEditModal = () => {
    setModalEdit(false);
  };

  const handleLoadItemModal = (auxliary) => {
    console.log(currentListId);

    setGlobal('currentEmailListId', currentListId);

    if (currentListId == getGlobal.currentEmailListId) {
      setCurrentEmailListIdAux('');
    }

    setModalButtonsOn(false);

    //console.log(auxliary);
  };

  const deletePermanently = (item) => {
    deleteEmailList(item);
    setModalDeleteConfirmation(false);
  };

  const handleChange = (e) => {
    setNewItem(sanitizeForApi(e.target.value));
    setNoteBelowTheInput(testIfItExists(listsOfEmails, 'title', sanitizeForApi(e.target.value).trim()));
  };

  const handleChange2 = (e) => {
    // setNewDescription(sanitizeForApi(e.target.value))
    setGlobal('displayedListOfEmails', e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (idToken) {
        try {
          // Set loading to true before starting the operation
          setLoading(true);

          // api-endpoint for serving the items
          const response = await axios.get(`${apiUrl}/api/emaillists`, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
          // Set data and loading to false when the operation is complete
          setListsOfEmails(response.data.results);
          setLoading(false);
          arrHandler(response.data.results);
        } catch (error) {
          // Handle errors if needed
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      }
    };

    // Call the fetchData function
    fetchData();

    // Dependency array includes 'setLoading, setListsOfEmails'
  }, [setLoading, setListsOfEmails, reload, currentItem, curentEmails]);

  const deleteEmailList = async (item) => {
    const newListArray = ifExistDeleteFromArrayOfObjects(listsOfEmails, 'title', item);

    if (idToken) {
      try {
        // api-endpoint for deleting the item
        const response = await axios.delete(`${apiUrl}/api/emaillists/${currentListId}`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          // Perform actions with the data
          console.log('Delete request successful:', data);
        }
        setCurrentItem('');
        setCurentEmails('');
      } catch (error) {
        console.error('Error deleting item data:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.put('/api/listOfVotings/template/change', {
      lov_id: curentVotingId,
      oldTitle: currentItem,
      title: newItem.trim(),
      description: getGlobal.displayedListOfEmails.trim(),
    });

    hideEditModal();
  };

  const handleLoadModal = ({ currentItem, curentEmails }) => {
    setCurrentItem(currentItem);
    setCurentEmails(curentEmails);
    handleEmails(curentEmails, currentItem);
  };

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

  return (
    <>
      {modalButtonsOn && (
        <div style={isMobile ? styles02.displayed : styles02.desktopFormContainerHidden}>
          <div style={modalWindowsStyles.nameOfItemOnModalNest}>
            <div style={modalWindowsStyles.solidFoundation}>
              <div style={{ height: '30px' }}></div>
              <p style={modalWindowsStyles.modalMessage}>Choose an action for the item</p>
              <h3 style={modalWindowsStyles.modalHeader}>{currentItem}</h3>
              <div style={styles02.buttonNest01}>
                <button
                  style={modalWindowsStyles.invisibleNostyle}
                  onClick={() => handleLoadItemModal({ currentItem, currentListId })}
                >
                  <ISloadDef style={modalWindowsStyles.modalRowIcone} />
                </button>
                <button
                  style={modalWindowsStyles.invisibleNostyle}
                  onClick={() => handleDeleteItemModal({ currentItem, currentListId })}
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
                        currentItem={curentEmailList.list_name}
                        currentId={curentEmailList.list_id}
                        curentEmails={curentEmailList.emails}
                        handleLoadModal={handleLoadModal}
                        handleEmails2={handleEmails2}
                        getGlobal={getGlobal}
                        setGlobal={setGlobal}
                        setCurrentEmailListIdAux={setCurrentEmailListIdAux}
                        setModalButtonsOn={setModalButtonsOn}
                      />
                    }
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DashBoardDistributeItems;
