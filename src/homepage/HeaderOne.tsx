import { colors, CssBaseline, useMediaQuery } from '@mui/material';
import { CSSProperties, useRef, useState } from 'react';

import MenuButon from './MenuButon';
import SeparatingLine from './SeparatingLine';
import { UseWidthUpdater } from './UseWidthUpdater';
import mobileWidth from '../css-and-material/isDevice';
import { ReactComponent as BurgerMenu } from '../img/burger_menu.svg'; // This is correct if using SVG as a component
import { ReactComponent as ClosingSign } from '../img/closing_sign.svg'; // This is correct if using SVG as a component
import { ReactComponent as MyLogo } from '../img/logo_votelizer.svg'; // This is correct if using SVG as a component

// Define the types for props
interface HeaderProps {
  title?: string; // Required prop
  subtitle?: string; // Optional prop
}

// Functional component with destructured props
const HeaderOne: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const containerRef = useRef<HTMLDivElement>(null); // Create a reference to the container
  const [width, setWidth] = useState(0); // Store the container's width
  const [collapsed, setCollapsed] = useState<boolean>(true);

  // Use the external hook for width updating logic
  UseWidthUpdater(containerRef, setWidth);
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  const lineGapVal = Number(width * width * width * 0.0000000044);

  const logoHeight = Number(width / 25.418666667 + 60 * 0.26) / 1.26;
  const logoWidtht = Number(width / 5.795629869 + 263.150000006 * 0.26) / 1.26;

  // Define the style object using the CSSProperties type
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
      display: 'flex' /* Enable flexbox */,
      justifyContent: 'space-between' /* Align items at the ends */,
      alignItems: 'center' /* Center items vertically */,
      height: logoHeight,
      padding: '0px',
      color: 'white',
      textAlign: 'center', // TypeScript now understands this is a valid value for textAlign
    },
    box1: {
      height: logoHeight,
      padding: '0px',
      paddingLeft: logoHeight / 2,
      alignContent: 'left',
      textAlign: 'left', // TypeScript now understands this is a valid value for textAlign
    },
    box2: {
      height: logoHeight,
      padding: '0px',
      paddingRight: logoHeight / 2,
      color: 'white',
      textAlign: 'right', // TypeScript now understands this is a valid value for textAlign
      display: 'flex' /* Enable flexbox */,
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
      zIndex: '10000',
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
    setCollapsed((prev) => !prev); // Toggle the collapsed state
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

              <a href="/login">Log&nbsp;in</a>
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
          <MenuButon title="Log&nbsp;in" textColor="#FFA50D" urlValue="login" buttonSize={logoHeight} />
          <SeparatingLine lineLength={0.364583333} />
          <MenuButon title="Sign&nbsp;up" textColor="#FFA50D" urlValue="registration" buttonSize={logoHeight} />
          <SeparatingLine lineLength={0.364583333} />
        </div>
      )}
    </div>
  );
};

export default HeaderOne;
