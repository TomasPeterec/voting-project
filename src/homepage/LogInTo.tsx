import { colors, CssBaseline, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderOne from './HeaderOne';
import HeroCell from './HeroCell';
import DashBoardVotingsForm from '../dashboard/votings/main/dash-board-votings-form';
import LoginFormNew from './loginFormNew';
import TextRow from './TextRow';
import { UseWidthUpdater } from './UseWidthUpdater';
import BottomBanner from '../banners/BottomBanner';
import SideBanner from '../banners/SideBanner';
import Footer from '../common/Footer';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook
import DashboardProvider from '../contexts/DashboardProvider';
import mobileWidth from '../css-and-material/is-device';
import staticStyles from '../css-and-material/staticStyles';
import DashBoardStaticTexts from '../dashboard/common/dash-board-static-texts';
import DashBoardVotingItems from '../dashboard/votings/main/dash-board-voting-items';
import firebaseConfig from '../firebaseConfig';
import MyBackground from '../img/modryPodklad.jpg';

// Initialize Firebase
initializeApp(firebaseConfig);
const apiUrl = process.env.REACT_APP_API_ROOT_VAR;

interface CustomUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

const LogInTo: React.FC = () => {
  const { user, idToken } = useAuth(); // Use the context to get user and token
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null); // Create a reference to the container
  const [width, setWidth] = useState(0); // Store the container's width
  const uID = 'I99VjupuITgoS7mvvIiIKYxNRxo2';
  const [arrayOfE, setArrayOfE] = useState([]);
  const [reload, setReload] = useState(false);

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
  const boxesContainerPadding = HeadlinePadding + 8;
  const upAndDown = logoHeight * 0.5;

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
    setLoading(false); // Set loading to false once the effect runs
  }, [idToken]); // Run effect whenever idToken changes

  return (
    <DashboardProvider>
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
              ></div>
              <div style={styles.heroSection}>
                {/* Headline */}
                <DashBoardStaticTexts title="Login" breadcrumb="&nbsp;" urlBack="" />
                {/* Form */}
                <LoginFormNew />
              </div>
              <div style={{ width: '100%', height: upAndDown }} />
              <div style={{ width: '100%', height: '1.5625vw' }} />
            </div>
            {/* Central middle part */}
            <div style={styles.centralPart}></div>
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
          <div
            className="mottomBanner"
            style={{
              backgroundColor: '#D9D9D9',
              width: '320px',
              height: '50px',
              position: 'fixed',
              bottom: '0', // Align to bottom
              left: '50%', // Center horizontally
              transform: 'translateX(-50%)', // Correct centering
              textAlign: 'center', // Optional: for centering text inside the banner
            }}
          >
            <BottomBanner />
          </div>
        ) : (
          <></>
        )}
      </div>
    </DashboardProvider>
  );
};

export default LogInTo;
