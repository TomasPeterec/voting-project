// DashboardStatisticVoters.tsx
import { CssBaseline, useMediaQuery } from '@mui/material';
import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // Import useParams to get the dynamic parts of the URL
import HeaderTwo from './HeaderTwo';
import { UseWidthUpdater } from './UseWidthUpdater';
import BottomBanner from '../banners/BottomBanner';
import SideBanner from '../banners/SideBanner';
import Footer from '../common/Footer';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook
import { useMainContext } from '../contexts/useMainContext'; // Correct path to your context
import mobileWidth from '../css-and-material/isDevice';
import staticStyles from '../css-and-material/staticStyles';
import DashBoardStaticTexts from '../dashboard/common/DashBoardStaticTexts';
import CandidateItems from 'dashboard/votings/votingform/CandidateItems';
import votingFormStyles from '../css-and-material/votingFormStyles';
import DashBoardVotingStatsVoters from '../dashboard/votings/statistics/DashBoardVotingStatsVoters';

const apiUrl = process.env.REACT_APP_API_ROOT_VAR;

interface CustomUser {
  email: string | null;
  displayName: string | null;
}

const DashboardStatisticVoters: React.FC = () => {
  const { uuid } = useParams(); // Capture dynamic UUID parameters from the URL
  const { appState, appStateSetter } = useMainContext();
  const { idToken } = useAuth(); // Use the context to get user and token
  const { getValidToken } = useAuth(); // Use the context to get user and token
  const [username, setUsername] = useState<string | null>(null);

  // Create a reference to the container
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0); // Store the container's width

  // useEffect(() => {
  //   const fetchUsername = async () => {
  //     console.log('f1');
  //     const localIdToken = await getValidToken();
  //     if (localIdToken) {
  //       // Only fetch if we have a valid token
  //       try {
  //         const response = await axios.get(`${apiUrl}/username`, {
  //           headers: {
  //             Authorization: `Bearer ${localIdToken}`,
  //           },
  //         });

  //         if (response.data.username) {
  //           setUsername(response.data.username);
  //         } else {
  //           console.log('No username found, navigating to set username');
  //         }
  //       } catch (error) {
  //         console.error('Error fetching username:', error);
  //       }
  //     }
  //   };

  //   fetchUsername();
  // }, [idToken]); // Run effect whenever idToken changes

  // Define the expected structure of a Firebase ID token
  type DashboardStatisticVoters = {
    user_id: string; // UID of the user
    email?: string; // Email address (optional)
    exp?: number; // Expiration timestamp (optional)
    iat?: number; // Issued-at timestamp (optional)
    [key: string]: any; // Allow other optional fields
  };

  // Use the external hook for width updating logic
  UseWidthUpdater(containerRef, setWidth);

  const headlineheight = Number(16 + width * 0.02);
  const logoHeight = Number(width / 25.418666667 + 60 * 0.26) / 1.26;
  const HeadlinePadding = logoHeight * 1.5;
  const upAndDown = logoHeight * 0.5;

  const localStyles = votingFormStyles({ headlineheight, logoHeight, HeadlinePadding, upAndDown });

  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  return (
    <div style={staticStyles.mainDiv}>
      <div style={localStyles.container}>
        {isMobile ? (
          <></>
        ) : (
          <div style={staticStyles.sidebarHolder}>
            <div style={staticStyles.overNestLeft} />
            <div style={staticStyles.sidebannerNestLeft}>
              <SideBanner />
            </div>
          </div>
        )}
        {/* Main central container */}
        <div style={localStyles.mainContent}>
          <CssBaseline />
          {/* Main upper part */}
          <div ref={containerRef} style={localStyles.topBar}>
            <div style={localStyles.headerContainer} />
            <div style={staticStyles.aboveHeader}>
              <HeaderTwo username={username as string | undefined} />
            </div>

            <div style={localStyles.underHeader}></div>
            <div style={localStyles.heroSection}>
              {/* Headline */}
              <DashBoardStaticTexts
                title={appState.actualVoteToVoting}
                breadcrumb={`Email of the voter: ${appState.emailOfVoter}`}
                urlBack=""
              />
              <div style={staticStyles.overForm} />
              {/* Here was Form */}
            </div>
            <div style={localStyles.underForm} />
            <div style={staticStyles.aboveCentralMiddlePart} />
          </div>
          {/* Central middle part */}
          <DashBoardVotingStatsVoters uuId={uuid} />
          <div style={localStyles.centralPart}>{/* There was items */}</div>
          {/* Footer */}
          <div style={localStyles.footerCont}>
            <Footer logoHeight={logoHeight} />
          </div>
        </div>

        {isMobile ? (
          <></>
        ) : (
          <div style={staticStyles.sidebarHolder}>
            <div style={staticStyles.overNestRight} />
            <div style={staticStyles.sidebannerNestRight}>
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

export default DashboardStatisticVoters;
