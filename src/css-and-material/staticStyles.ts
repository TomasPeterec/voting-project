// staticStyles.ts
import { CSSProperties } from 'react';

const staticStyles: {
  container: CSSProperties;
  sidePanel: CSSProperties;
  mainContent: CSSProperties;
  userInfo: CSSProperties;
  articleContainer01: CSSProperties;
  footerCont: CSSProperties;
  centralPart: CSSProperties;
  bottombanner: CSSProperties;
  sidebannerNestRight: CSSProperties;
  sidebannerNestLeft: CSSProperties;
  overNestRight: CSSProperties;
  overNestLeft: CSSProperties;
  overForm: CSSProperties;
  mainDiv: CSSProperties;
  aboveCentralMiddlePart: CSSProperties;
  sidebarHolder: CSSProperties;
  aboveHeader: CSSProperties;
} = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'flex-start',
    backgroundColor: '#F7F7F7',
  },
  sidePanel: {
    width: '160px',
    height: '600px',
    backgroundColor: '#D9D9D9',
    margin: '3.9vw',
  },
  mainContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Ensure minimum height is full viewport
  },
  userInfo: {
    color: 'white',
    fontSize: '12px',
  },
  articleContainer01: {
    backgroundColor: 'white',
  },
  footerCont: {
    flexShrink: 0,
  },
  centralPart: {
    flexGrow: 1, // Allow it to grow
    display: 'flex', // Use flex to manage inner content layout
    flexDirection: 'column', // Optional: control child layout
    padding: '5px', // Optional: add padding for spacing
    paddingLeft: '2vw',
    paddingRight: '2vw',
  },
  bottombanner: {
    backgroundColor: '#D9D9D9',
    width: '320px',
    height: '50px',
    position: 'fixed',
    bottom: '0', // Align to bottom
    left: '50%', // Center horizontally
    transform: 'translateX(-50%)', // Correct centering
    textAlign: 'center', // Optional: for centering text inside the banner
  },
  sidebannerNestRight: {
    width: '160px',
    height: '600px',
    position: 'fixed',
    right: '0px',
  },
  sidebannerNestLeft: {
    width: '160px',
    height: '600px',
    position: 'fixed',
    left: '0px',
  },
  overNestRight: {
    width: '160px',
    height: '600px',
    marginLeft: '3.9vw',
  },
  overNestLeft: {
    width: '160px',
    height: '600px',
    marginRight: '3.9vw',
  },
  overForm: {
    width: '100%',
    height: '14px',
  },
  mainDiv: {
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    height: '100%',
  },
  aboveCentralMiddlePart: {
    width: '100%',
    height: '1.5625vw',
  },
  sidebarHolder: {
    display: 'inline-flex',
  },
  aboveHeader: {
    height: '3.125vw',
  },
};

export default staticStyles;
