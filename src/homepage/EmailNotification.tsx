import { colors, CssBaseline, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { number } from 'prop-types';
import React, { CSSProperties, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderOne from './HeaderOne';
import HeroCell from './HeroCell';
import TextRow from './TextRow';
import { UseWidthUpdater } from './UseWidthUpdater';
import BottomBanner from '../banners/BottomBanner';
import SideBanner from '../banners/SideBanner';
import Footer from '../common/Footer';
import mobileWidth from '../css-and-material/isDevice';
import firebaseConfig from '../firebaseConfig';
import MyBackground from '../img/modryPodklad.jpg';
import staticStyles from '../css-and-material/staticStyles';

// Initialize Firebase
initializeApp(firebaseConfig);
const apiUrl = process.env.REACT_APP_API_ROOT_VAR;
const auth = getAuth();

interface CustomUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

const EmailNotification: React.FC = () => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null); // Create a reference to the container
  const [width, setWidth] = useState(0); // Store the container's width

  // Use the external hook for width updating logic
  UseWidthUpdater(containerRef, setWidth);

  const headlineheight = Number(16 + width * 0.02);
  const logoHeight = Number(width / 25.418666667 + 60 * 0.26) / 1.26;
  const HeadlinePadding = logoHeight * 1.5;
  const boxesContainerPadding = HeadlinePadding + 8;
  const upAndDown = logoHeight * 2;

  const styles: {
    container: CSSProperties;
    sidePanel: CSSProperties;
    mainContent: CSSProperties;
    topBar: CSSProperties;
    headerContainer: CSSProperties;
    heroSection: CSSProperties;
    heroHeading: CSSProperties;
    heroSubheading: CSSProperties;
    heroCellBox: CSSProperties;
    flexContainer: CSSProperties;
    userInfo: CSSProperties;
    articleContainer01: CSSProperties;
    footerCont: CSSProperties;
    centralPart: CSSProperties;
  } = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      alignItems: 'flex-start',
      backgroundColor: 'white',
    },
    sidePanel: {
      width: '160px',
      height: '600px',
      backgroundColor: '#D9D9D9',
      margin: '3.9vw',
    },
    mainContent: {
      flexGrow: 1,
      height: '100%',
    },
    topBar: {
      backgroundColor: '#444444',
      backgroundImage: `url(${MyBackground})`,
      borderBottomLeftRadius: logoHeight / 2,
      borderBottomRightRadius: logoHeight / 2,
    },
    headerContainer: {
      height: logoHeight / 2,
      textAlign: 'right',
    },
    heroSection: {
      width: '100%',
      paddingLeft: HeadlinePadding,
    },
    heroHeading: {
      fontSize: headlineheight,
      color: '#FFA50D',
    },
    heroSubheading: {
      fontSize: Number(headlineheight / 1.272 / 1.272),
      color: '#ffffff',
    },
    heroCellBox: {
      padding: logoHeight * 0.1,
    },
    flexContainer: {
      paddingLeft: boxesContainerPadding,
      paddingRight: boxesContainerPadding,
      maxWidth: '3000px',
    },
    userInfo: {
      color: 'white',
      fontSize: '12px',
    },
    articleContainer01: {
      backgroundColor: 'purple',
    },
    footerCont: {
      bottom: '0px',
      flexShrink: 0,
    },
    centralPart: {
      flexGrow: 1,
    },
  };

  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     if (currentUser) {
  //       const userData: CustomUser = {
  //         uid: currentUser.uid,
  //         email: currentUser.email,
  //         displayName: currentUser.displayName,
  //       };

  //       const idToken = await currentUser.getIdToken();
  //       setUser(userData);

  //       try {
  //         const response = await axios.get(`${apiUrl}/api/users/username`, {
  //           headers: {
  //             'Authorization': `Bearer ${idToken}`,
  //           },
  //         });

  //         // Log the full response for debugging
  //         console.log('Full response:', response);

  //         if (response.data.username) {
  //           console.log('Username:', response.data.username); // Log just the username
  //           setUsername(response.data.username);
  //           //navigate('/welcome');
  //         } else {
  //           console.log('No username found, navigating to set username');
  //           console.log('Email veried: ',response.data.emailVerified);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching username:', error);
  //       }
  //     } else {
  //       setUser(null);
  //       setUsername(null);
  //     }
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, [navigate]);

  return (
    <div style={{ backgroundColor: 'white', alignItems: 'center', height: '100%' }}>
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
            ></div>
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
            <div style={styles.headerContainer}></div>
            <div style={{ height: '3.125vw' }}>
              <HeaderOne />
            </div>

            <div
              style={{
                width: '100%',
                height: upAndDown,
                textAlign: 'right',
                paddingTop: '10px',
                paddingRight: logoHeight / 1.5,
              }}
            >
              <div style={styles.userInfo}>{loading ? 'Loading...' : ''}</div>
              <div style={styles.userInfo}>{!user ? 'Not logged in' : 'Logged in'}</div>
              <div style={styles.userInfo}>
                {!username ? 'Username neexistuje' : 'Username existuje a je: ' + username}
              </div>
            </div>
            <div style={styles.heroSection}>
              <h2 style={styles.heroSubheading}>
                A verification email has been sent to the email address you provided when signing up.
              </h2>
            </div>
            <div style={{ width: '100%', height: upAndDown }}></div>

            <div style={{ width: '100%', height: '1.5625vw' }}></div>
          </div>
          {/* Central middle part */}
          <div style={styles.centralPart}></div>
          {/* Central middle part */}

          <div style={styles.footerCont}>
            <Footer
              backColor="#d0d0d0"
              title="Get started"
              leftContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              rightContent="But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness."
            />
          </div>
        </div>

        {isMobile ? (
          <></>
        ) : (
          <div style={{ display: 'inline-flex' }}>
            <div style={{ width: '160px', height: '600px', marginLeft: '3.9vw' }}></div>
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

export default EmailNotification;
