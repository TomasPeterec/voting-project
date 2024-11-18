import { useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mobileWidth from '../css-and-material/is-device';
import { modalWindowsStyles } from '../css-and-material/modalWindowsStyles';
import votingTheme from '../css-and-material/theme';
import firebaseConfig from '../firebaseConfig';
import '../css-and-material/autofillStyles.css';

// Initialize Firebase app
initializeApp(firebaseConfig);

// Login Form Component
const LoginFormNew = () => {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`); // Determine if it's a mobile screen
  const navigate = useNavigate();
  const [isSendButtonHovered, setSendButtonHovered] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before login attempt

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in');
      navigate('/votings/dashboard');
    } catch (error) {
      setErrorMessage('Incorrect email or password'); // Custom error message
      console.error('Error logging in:', error.message);
    }
  };

  // Compute dynamic styles based on mobile screen
  const loginFormStyles = {
    ...modalWindowsStyles,
    solidFoundation: {
      ...modalWindowsStyles.solidFoundation,
      width: '100%',
    },
    sendButton: {
      ...modalWindowsStyles.sendButton,
      width: isMobile ? '100%' : '190px', // Set width to 100% on mobile
      height: isMobile ? 'clamp(43.85px, 11vw, 65px)' : '59px',
      marginTop: isMobile ? '14px' : '9px', // Adjust margin on mobile
    },
    sendButtonHover: {
      ...modalWindowsStyles.sendButtonHover,
      width: isMobile ? '100%' : '190px', // Set width to 100% on mobile
      height: isMobile ? 'clamp(43.85px, 11vw, 65px)' : '59px',
      marginTop: isMobile ? '14px' : '9px', // Adjust margin on mobile
    },
  };

  useEffect(() => {
    // Update or log any changes to the mobile state or other state changes
    console.log('Is mobile screen: ', isMobile);
  }, [isMobile]);

  return (
    <div style={{ margin: '0px' }}>
      <div style={loginFormStyles.solidFoundation}>
        <form onSubmit={handleLoginSubmit} style={{ width: '100%' }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: '100%' }}>
              <Typography sx={votingTheme.typography.formDescription}>Email</Typography>
              <input
                style={modalWindowsStyles.inputStyle}
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={{ width: '100%' }}>
              <Typography sx={votingTheme.typography.formDescription}>Password</Typography>
              <input
                style={modalWindowsStyles.inputStyle}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && (
              <Typography sx={votingTheme.typography.inputRequired} color="red">
                {errorMessage}
              </Typography>
            )}
            <Button
              style={isSendButtonHovered ? loginFormStyles.sendButtonHover : loginFormStyles.sendButton}
              type="submit"
              onMouseEnter={() => setSendButtonHovered(true)}
              onMouseLeave={() => setSendButtonHovered(false)}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginFormNew;
