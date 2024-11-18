import { useMediaQuery } from '@mui/material';
import React, { CSSProperties, useRef, useState } from 'react';
import MenuButon from './MenuButon';
import SeparatingLine from './SeparatingLine';
import SimpleLogout from './SimpleLogout';
import { UseWidthUpdater } from './UseWidthUpdater';
import mobileWidth from '../css-and-material/is-device';
import { ReactComponent as BurgerMenu } from '../img/burger_menu.svg';
import { ReactComponent as ClosingSign } from '../img/closing_sign.svg';
import { ReactComponent as MyLogo } from '../img/logo_votelizer.svg';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Define the types for props
interface HeaderProps {
  username?: string;
}

// Functional component with destructured props
const HeaderOne: React.FC<HeaderProps> = ({ username }) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [collapsed, setCollapsed] = useState<boolean>(true);

  UseWidthUpdater(containerRef, setWidth);
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  const lineGapVal = width * width * width * 0.0000000044;
  const logoHeight = (width / 25.418666667 + 60 * 0.26) / 1.26;
  const logoWidtht = (width / 5.795629869 + 263.150000006 * 0.26) / 1.26;

  const styles: {
    header: CSSProperties;
    box1: CSSProperties;
    box2: CSSProperties;
    logoStyle: CSSProperties;
    burgermenuStyle: CSSProperties;
    slidingMenuClosed: CSSProperties;
    slidingMenuOpen: CSSProperties;
    slidingMenu: CSSProperties;
  } = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: logoHeight,
      padding: '0px',
      color: 'white',
      textAlign: 'center',
    },
    box1: {
      height: logoHeight,
      padding: '0px',
      paddingLeft: logoHeight / 2,
      textAlign: 'left',
    },
    box2: {
      height: logoHeight,
      padding: '0px',
      paddingRight: logoHeight / 2,
      color: 'white',
      textAlign: 'right',
      display: 'flex',
    },
    logoStyle: {
      height: logoHeight,
      width: logoWidtht,
    },
    burgermenuStyle: {
      height: logoHeight / 2,
      width: logoHeight / 2,
      margin: logoHeight / 4,
    },
    slidingMenuClosed: {
      display: 'none',
    },
    slidingMenuOpen: {
      display: 'block',
      width: '330px',
      position: 'fixed',
      right: '0px',
      top: '0px',
      zIndex: 10000,
      height: '100%',
      paddingTop: '60px',
    },
    slidingMenu: {
      backgroundColor: 'rgba(13,13,13,0.95)',
      height: '100%',
      paddingLeft: logoHeight / 2,
      paddingRight: logoHeight / 2,
      textAlign: 'left',
      backdropFilter: 'blur(20px)',
    },
  };

  const handleBurgerClick = () => {
    setCollapsed((prev) => !prev);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/home'); // Default to '/home' if urlValue is not provided
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div ref={containerRef} style={styles.header}>
      <div style={styles.box1}>
        <MyLogo style={styles.logoStyle} />
      </div>
      {isMobile ? (
        <div style={styles.box2}>
          <BurgerMenu style={styles.burgermenuStyle} onClick={handleBurgerClick} />
          <div style={collapsed ? styles.slidingMenuClosed : styles.slidingMenuOpen}>
            <div style={styles.slidingMenu}>
              <div>
                <div style={{ height: logoHeight / 2 }}></div>
                <ClosingSign style={styles.burgermenuStyle} onClick={handleBurgerClick} />
                <div style={{ height: logoHeight / 2 }}></div>
              </div>
              <a href="/">Home</a>
              <br />
              <a href="/about">About</a>
              <br />
              <a href="/tutorials">Tutorials</a>
              <br />
              <a href="/votings">Votings</a>
              <br />
              <a href="/home" onClick={handleLogout}>
                Log out
              </a>
              <br />
              <a href="/signup">Sign&nbsp;up</a>
              <br />
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.box2}>
          <SeparatingLine lineLength={0.78125} />
          <MenuButon title="Home" textColor="white" active urlValue="" buttonSize={logoHeight} />
          <SeparatingLine lineLength={0.364583333} />
          <MenuButon title="About" textColor="white" urlValue="" buttonSize={logoHeight} />
          <SeparatingLine lineLength={0.364583333} />
          <MenuButon title="Tutorials" textColor="white" urlValue="" buttonSize={logoHeight} />
          <SeparatingLine lineLength={0.364583333} />
          <MenuButon title="Votings" textColor="white" urlValue="" buttonSize={logoHeight} />
          <SeparatingLine lineLength={lineGapVal} />
          <SimpleLogout textColor="#FFA50D" urlValue="/home" buttonSize={logoHeight} />
          <SeparatingLine lineLength={0.364583333} />
          <MenuButon title={username ?? ''} textColor="#186DFD" urlValue="" buttonSize={logoHeight} />
          <SeparatingLine lineLength={0.364583333} />
        </div>
      )}
    </div>
  );
};

export default HeaderOne;
