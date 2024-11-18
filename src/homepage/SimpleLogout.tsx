import { getAuth, signOut } from 'firebase/auth';
import React, { CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define types for the props
interface SimpleLogoutProps {
  textColor: string;
  urlValue: string;
  buttonSize: number;
}

const SimpleLogout: React.FC<SimpleLogoutProps> = ({ textColor, urlValue, buttonSize }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const radius = buttonSize / 2;
  const sidePadding = buttonSize / 2.54;

  const styles: { thinlineButton: CSSProperties } = {
    thinlineButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: buttonSize,
      padding: '0.2vw',
      color: textColor || 'inherit', // Fallback if textColor is not provided
      textAlign: 'center',
      fontSize: '1vw',
      border: '1px solid rgba(255, 255, 255, 0.17)',
      borderRadius: radius,
      paddingLeft: sidePadding,
      paddingRight: sidePadding,
      backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
    },
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate(urlValue || '/home'); // Default to '/home' if urlValue is not provided
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button
      style={styles.thinlineButton}
      onClick={handleLogout}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Log&nbsp;out
    </button>
  );
};

export default SimpleLogout;
