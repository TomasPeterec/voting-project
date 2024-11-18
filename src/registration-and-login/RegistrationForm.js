import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import firebaseConfig from '../firebaseConfig'; // Make sure the Firebase config is imported
import { initializeApp } from 'firebase/app';
import mobileWidth from '../css-and-material/is-device';
import { modalWindowsStyles } from '../css-and-material/modalWindowsStyles';
import votingTheme from '../css-and-material/theme';
import '../css-and-material/autofillStyles.css';

// Initialize Firebase app
initializeApp(firebaseConfig);

// Registration Form Component
const RegistrationForm = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`); // Determine if it's a mobile screen
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSendButtonHovered, setSendButtonHovered] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before registration attempt

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered successfully');
      navigate('/votings/dashboard'); // Navigate to a dashboard after successful registration
    } catch (error) {
      setErrorMessage('Error registering user: ' + error.message); // Custom error message
      console.error('Error registering user:', error.message);
    }
  };

  // Compute dynamic styles based on mobile screen
  const registrationFormStyles = {
    ...modalWindowsStyles,
    solidFoundation: {
      ...modalWindowsStyles.solidFoundation,
      width: '100%',
    },
    sendButton: {
      ...modalWindowsStyles.sendButton,
      width: isMobile ? '100%' : '190px',
      height: isMobile ? 'clamp(43.85px, 11vw, 65px)' : '59px',
      marginTop: isMobile ? '14px' : '9px',
      paddingLeft: '50px',
      paddingRight: '50px',
    },
    sendButtonHover: {
      ...modalWindowsStyles.sendButtonHover,
      width: isMobile ? '100%' : '190px',
      height: isMobile ? 'clamp(43.85px, 11vw, 65px)' : '59px',
      marginTop: isMobile ? '14px' : '9px',
      paddingLeft: '50px',
      paddingRight: '50px',
    },
  };

  return (
    <div style={{ margin: '0px' }}>
      <div style={registrationFormStyles.solidFoundation}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                onChange={handleEmailChange}
                required
              />
            </div>

            <div style={{ width: '100%' }}>
              <Typography sx={votingTheme.typography.formDescription}>Password</Typography>
              <input
                style={modalWindowsStyles.inputStyle}
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            {errorMessage && (
              <Typography sx={votingTheme.typography.inputRequired} color="red">
                {errorMessage}
              </Typography>
            )}

            <Button
              style={isSendButtonHovered ? registrationFormStyles.sendButtonHover : registrationFormStyles.sendButton}
              type="submit"
              onMouseEnter={() => setSendButtonHovered(true)}
              onMouseLeave={() => setSendButtonHovered(false)}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
