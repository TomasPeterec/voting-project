import { CSSProperties } from 'react';

const staticStyles: {
  container: CSSProperties;
  sidePanel: CSSProperties;
  mainContent: CSSProperties;
  userInfo: CSSProperties;
  articleContainer01: CSSProperties;
  footerCont: CSSProperties;
  centralPart: CSSProperties;
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
};

export default staticStyles;
