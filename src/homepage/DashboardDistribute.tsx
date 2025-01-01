import { CssBaseline, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DashBoardDistributeItems from '../dashboard/votings/distribute/dash-board-distribute-items';
import DashBoardDistributeForm from '../dashboard/votings/distribute/dash-board-distribute-form';

import CandidateItems from 'dashboard/votings/votingform/CandidateItems';

import HeaderTwo from './HeaderTwo';
import { UseWidthUpdater } from './UseWidthUpdater';
import BottomBanner from '../banners/BottomBanner';
import SideBanner from '../banners/SideBanner';
import Footer from '../common/Footer';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook
import { useMainContext } from '../contexts/useMainContext'; // Correct path

import mobileWidth from '../css-and-material/is-device';
import staticStyles from '../css-and-material/staticStyles';
import DashBoardStaticTexts from '../dashboard/common/dash-board-static-texts';
// import DashBoardEditItems from 'dashboard/votings/edit/dash-board-edit-items';
import firebaseConfig from '../firebaseConfig';
import MyBackground from '../img/modryPodklad.jpg';
//import DashBoardEditForm from 'dashboard/votings/edit/dash-board-edit-form';
import { jwtDecode } from 'jwt-decode';

// Initialize Firebase
initializeApp(firebaseConfig);
const apiUrl = process.env.REACT_APP_API_ROOT_VAR;

interface CustomUser {
  email: string | null;
  displayName: string | null;
}

const DashboardDistribute: React.FC = () => {
  const [getGlobal, setGetGlobal] = useState({
    curentSetOfEmails: '',
    curentItem: '',
    saveModalButtonClicked: false,
    nameOfNewSetOfEmails: '',
    displayedListOfEmails: '',
    currentEmailListId: '',
  });

  const { appState, appStateSetter } = useMainContext();
  const location = useLocation();
  const { currentItem, currentId } = location.state;
  const { idToken } = useAuth(); // Use the context to get user and toke
  const [username, setUsername] = useState<string | null>(null);

  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null); // Create a reference to the container
  const [width, setWidth] = useState(0); // Store the container's width
  const [arrayOfE, setArrayOfE] = useState([]);
  const [reload, setReload] = useState(false);
  const [emails, setEmails] = useState('');
  const [parentClick, setParentClick] = useState(false);
  const [currentEmailListIdAux, setCurrentEmailListIdAux] = useState('');

  useEffect(() => {
    const loading = async () => {
      if (idToken && currentEmailListIdAux !== getGlobal.currentEmailListId) {
        const newSetOfMails = await axios.get(`${apiUrl}/api/emaillists/${getGlobal.currentEmailListId}`, {
          headers: {
            Authorization: `Bearer ${idToken}`, // Include the authorization header
          },
        });

        const newData = newSetOfMails.data.map((item) => item.mail);
        setGlobal('curentSetOfEmails', newData);

        //setGlobal('clearSwitch',true);
        setCurrentEmailListIdAux(getGlobal.currentEmailListId);
      }
    };
    loading();
  }, [getGlobal]);

  // Define the expected structure of a Firebase ID token
  type FirebaseIdToken = {
    user_id: string; // UID of the user
    email?: string; // Email address (optional)
    exp?: number; // Expiration timestamp (optional)
    iat?: number; // Issued-at timestamp (optional)
    [key: string]: any; // Allow other optional fields
  };

  // Decode the ID token to extract the UID
  const getUidFromToken = (): string | null => {
    if (idToken) {
      const decodedToken = jwtDecode<FirebaseIdToken>(idToken); // Cast the decoded token
      return decodedToken.user_id; // Access the UID field
    }
    return null;
  };

  const uID = getUidFromToken();
  const userId = uID;

  const triggerReload = () => {
    setReload((prevReload) => !prevReload);
  };

  const handleItemArray = (arr) => {
    setArrayOfE(arr);
  };

  // Use the external hook for width updating logic
  UseWidthUpdater(containerRef, setWidth);

  const headlineheight = Number(16 + width * 0.02);
  const logoHeight = Number(width / 25.418666667 + 60 * 0.26) / 1.26;
  const HeadlinePadding = logoHeight * 1.5;
  const upAndDown = logoHeight * 0.5;

  const setGlobal = (propertyName, propertyValue) => {
    const temporaryObject = { ...getGlobal };
    temporaryObject[propertyName] = propertyValue;
    setGetGlobal(temporaryObject);
  };

  const mainEmailHandler = (newEmails) => {
    let newString = '';
    for (let i = 0; i < newEmails.length; i++) {
      if (i != 0) {
        newString = newString + ', ';
      }
      newString = newString + newEmails[i].mail;
    }
    setEmails(newString);
  };

  // This ist my current workplace
  const loadEmailsFromDb = async (name) => {
    try {
      // Include 'name' in the URL as a query parameter
      const encodedName = encodeURIComponent(name);
      const response = await axios.get(`/api/users/mails/curentList/?name=${encodedName}`);

      const data = response.data;

      setGlobal('curentSetOfEmails', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEmails = (newEmails, kk) => {
    loadEmailsFromDb(kk);
    mainEmailHandler(newEmails);
  };

  const handleEmails2 = (newEmails, kk) => {
    loadEmailsFromDb(kk);
    mainEmailHandler(newEmails);
  };

  const changeParentClick = () => {
    setParentClick(false);
  };

  const pushClickUp = (innerClick) => {
    setParentClick(innerClick);
  };

  const clearBigArea = () => {
    setEmails('');
  };

  const styles: typeof staticStyles & {
    topBar: React.CSSProperties;
    headerContainer: React.CSSProperties;
    heroSection: React.CSSProperties;
    heroHeading: React.CSSProperties;
    heroSubheading: React.CSSProperties;
    heroCellBox: React.CSSProperties;
    flexContainer: React.CSSProperties;
  } = {
    ...staticStyles,
    topBar: {
      backgroundColor: '#444444',
      backgroundImage: `url(${MyBackground})`,
      borderBottomLeftRadius: logoHeight / 2,
      borderBottomRightRadius: logoHeight / 2,
      flexShrink: 0,
    },
    headerContainer: {
      height: logoHeight / 2,
      textAlign: 'right',
    },
    heroSection: {
      width: '100%',
      paddingLeft: HeadlinePadding,
      paddingRight: HeadlinePadding,
    },
    heroHeading: {
      fontSize: headlineheight,
      color: '#FFA50D',
    },
    heroSubheading: {
      fontSize: headlineheight / 1.272 / 1.272,
      color: '#ffffff',
    },
    heroCellBox: {
      padding: logoHeight * 0.1,
    },
    flexContainer: {
      paddingLeft: HeadlinePadding,
      paddingRight: HeadlinePadding,
      maxWidth: '3000px',
    },
    centralPart: {
      ...staticStyles.centralPart,
      paddingLeft: HeadlinePadding * 0.667,
      paddingRight: HeadlinePadding * 0.667,
    },
    footerCont: {
      ...staticStyles.footerCont,
      paddingLeft: HeadlinePadding * 0.333,
      paddingRight: HeadlinePadding * 0.333,
    },
  };

  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  useEffect(() => {
    const fetchUsername = async () => {
      if (idToken) {
        // Only fetch if we have a valid token
        try {
          const response = await axios.get(`${apiUrl}/username`, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          if (response.data.username) {
            setUsername(response.data.username);
          } else {
            console.log('No username found, navigating to set username');
          }
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      }
    };

    fetchUsername();
    //setLoading(false); // Set loading to false once the effect runs
  }, [idToken]); // Run effect whenever idToken changes

  return (
    <div
      style={{
        backgroundColor: 'blue',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <div style={styles.container}>
        {isMobile ? (
          <></>
        ) : (
          <div style={{ display: 'inline-flex' }}>
            <div
              style={{
                width: '160px',
                height: '600px',
                marginRight: '3.9vw',
              }}
            />
            <div
              style={{
                width: '160px',
                height: '600px',
                position: 'fixed',
                left: '0px',
              }}
            >
              <SideBanner />
            </div>
          </div>
        )}
        {/* Main central container */}
        <div style={styles.mainContent}>
          <CssBaseline />
          {/* Main upper part */}
          <div ref={containerRef} style={styles.topBar}>
            <div style={styles.headerContainer} />
            <div style={{ height: '3.125vw' }}>
              <HeaderTwo username={username as string | undefined} />
            </div>

            <div
              style={{
                width: '100%',
                height: upAndDown,
                textAlign: 'right',
                paddingTop: '10px',
                paddingRight: logoHeight / 1.5,
              }}
            ></div>
            <div style={styles.heroSection}>
              {/* Headline */}
              <DashBoardStaticTexts
                title="Votings"
                breadcrumb={currentItem + ' - distribution'}
                urlBack="/votings/dashboard"
              />
              <div style={{ width: '100%', height: '14px' }} />
              {/* Form */}
              <DashBoardDistributeForm
                userId={userId}
                triggerReload={triggerReload}
                arrFromItems={arrayOfE}
                curentUuid={currentId}
                loadedEmails={emails}
                pushClickUp={pushClickUp}
                clearBigArea={clearBigArea}
                getGlobal={getGlobal}
                setGlobal={setGlobal}
              />
            </div>
            <div style={{ width: '100%', height: upAndDown }} />
            <div style={{ width: '100%', height: '1.5625vw' }} />
          </div>
          {/* Central middle part */}
          <div style={styles.centralPart}>
            <DashBoardDistributeItems
              userId={userId}
              reload={reload}
              curentVotingId={idToken}
              arrHandler={handleItemArray}
              handleEmails={handleEmails}
              parentClick={parentClick}
              changeParentClick={changeParentClick}
              handleEmails2={handleEmails2}
              setGlobal={setGlobal}
              getGlobal={getGlobal}
              setCurrentEmailListIdAux={setCurrentEmailListIdAux}
            />
          </div>
          {/* Footer */}
          <div style={styles.footerCont}>
            <Footer logoHeight={logoHeight} />
          </div>
        </div>

        {isMobile ? (
          <></>
        ) : (
          <div style={{ display: 'inline-flex' }}>
            <div style={{ width: '160px', height: '600px', marginLeft: '3.9vw' }} />
            <div
              style={{
                width: '160px',
                height: '600px',
                position: 'fixed',
                right: '0px',
              }}
            >
              <SideBanner />
            </div>
          </div>
        )}
      </div>

      {isMobile ? (
        <div style={staticStyles.bottombanner}>
          <BottomBanner />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DashboardDistribute;
