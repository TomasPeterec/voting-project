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

const IndexScreen: React.FC = () => {
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
  } = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
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
  };

  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData: CustomUser = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        };

        const idToken = await currentUser.getIdToken();
        setUser(userData);

        try {
          const response = await axios.get(`${apiUrl}/username`, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          // Log the full response for debugging
          console.log('Full response:', response);
          console.log('ide to');

          if (response.data.username) {
            console.log('Username:', response.data.username); // Log just the username
            setUsername(response.data.username);
            navigate('/votings/dashboard');
          } else {
            console.log('No username found, navigating to set username');
            console.log('Email verfied: ', response.data.emailVerified);

            if (!response.data.emailVerified) {
              navigate('/votings/email/notification');
            }
          }
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      } else {
        setUser(null);
        setUsername(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div style={{ backgroundColor: 'white', alignItems: 'center' }}>
      <div style={styles.container}>
        {isMobile ? (
          <div></div>
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

        <div style={styles.mainContent}>
          <CssBaseline />
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
            ></div>
            <div style={styles.heroSection}>
              <h1 style={styles.heroHeading}>
                <b>Rethink Voting:</b> Divide
                <br />
                Your Voice, Build Consensus
              </h1>
              <h2 style={styles.heroSubheading}>
                An innovative system that lets you distribute
                <br />
                your vote, fostering consensus and
                <br />
                reducing division.
              </h2>
            </div>
            <div style={{ width: '100%', height: upAndDown }}></div>

            {/* Bootstrap Grid Implementation */}
            <div className="container" style={styles.flexContainer}>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-3 col-xl-3" style={styles.heroCellBox}>
                  <HeroCell
                    title="Vote with sliders"
                    subtitle="Reflect your preferences by dividing your vote among multiple candidates."
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3 col-xl-3" style={styles.heroCellBox}>
                  <HeroCell
                    title="How It Works"
                    subtitle="Learn how our voting system uses sliders to distribute votes and foster fairer results."
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3 col-xl-3" style={styles.heroCellBox}>
                  <HeroCell
                    title="Why Choose Us?"
                    subtitle="Discover the benefits of a voting system that promotes consensus and minimizes division."
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-3 col-xl-3" style={styles.heroCellBox}>
                  <HeroCell
                    title="Get Started"
                    subtitle="Ready to try a new way to vote? Sign up and explore our intuitive platform."
                  />
                </div>
              </div>
            </div>

            <div style={{ width: '100%', height: '1.5625vw' }}></div>
          </div>
          <TextRow
            backColor="#EEF2F8"
            title="Vote with sliders"
            leftContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            rightContent="But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness."
          />
          <TextRow
            backColor="#F7FAFF"
            title="How it Works"
            leftContent="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
            rightContent="Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
          />
          <TextRow
            backColor="#F1F4F8"
            title="Why Choose Us?"
            leftContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            rightContent="But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness."
          />
          <TextRow
            backColor="#F7FAFF"
            title="Get started"
            leftContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            rightContent="But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness."
          />
          <Footer
            backColor="#d0d0d0"
            title="Get started"
            leftContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            rightContent="But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness."
          />
        </div>

        {isMobile ? (
          <div></div>
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
        <div></div>
      )}
    </div>
  );
};

export default IndexScreen;
