import { useMediaQuery } from '@mui/material';
import React, { CSSProperties } from 'react';
import mobileWidth from '../css-and-material/isDevice';

interface FooterProps {
  title?: string;
  leftContent?: string;
  rightContent?: string;
  backColor?: string;
  logoHeight?: number;
}

const Footer: React.FC<FooterProps> = ({
  title = 'Kontakt',
  leftContent = 'mail@something.net',
  rightContent = 'author',
  backColor = '#f5f5f5', // Default to white if not provided
  logoHeight,
}) => {
  const isMobile = useMediaQuery(`(max-width:${mobileWidth}px)`);

  const styles: {
    containerStyle: CSSProperties;
    boxStyle: CSSProperties;
    plainText: CSSProperties;
    HeadlineText: CSSProperties;
    articleItSelf: CSSProperties;
  } = {
    containerStyle: {
      border: '0px',
      margin: '0vw',
      padding: '1.5625vw',
      paddingBottom: '0px',
      paddingTop: '1.171875vw',
      paddingLeft: '0px',
      paddingRight: '0px',
      maxWidth: '3000px',
    },
    articleItSelf: {
      backgroundColor: backColor,
      borderRadius: '1.5625vw',
      borderBottomLeftRadius: '0px',
      borderBottomRightRadius: '0px',
      paddingLeft: logoHeight ? logoHeight / 1 : '2vw', // Fallback to 1em if logoHeight is undefined
      paddingRight: logoHeight ? logoHeight / 1 : '2vw', // Fallback to 1em if logoHeight is undefined
      paddingTop: logoHeight ? logoHeight / 2 : '2vw', // Fallback to 1em if logoHeight is undefined
      paddingBottom: logoHeight ? logoHeight / 4 : '2vw', // Fallback to 1em if logoHeight is undefined
    },
    boxStyle: {},
    plainText: {
      fontSize: '15px',
    },
    HeadlineText: {
      color: '#004FAB',
      fontSize: '19.08px',
    },
  };

  return (
    <div className="container" style={styles.containerStyle}>
      <div style={styles.articleItSelf}>
        <div className="col-12 col-md-12 col-xl-12" style={styles.boxStyle}>
          <h2 style={styles.HeadlineText}>
            <b>{title}</b>
          </h2>
        </div>
        <div className="row">
          <div className="col-6 col-md-6 col-xl-6" style={styles.boxStyle}>
            <p style={styles.plainText}>{leftContent}</p>
          </div>
          <div className="col-6 col-md-6 col-xl-6" style={styles.boxStyle}>
            <p style={styles.plainText}>{rightContent}</p>
          </div>
        </div>
        {isMobile ? (
          <div
            className="mottomBanner"
            style={{
              width: '320px',
              height: '50px',
              bottom: '0', // Align to bottom
              left: '50%', // Center horizontally
              transform: 'translateX(-50%)', // Correct centering
              textAlign: 'center', // Optional: for centering text inside the banner
            }}
          ></div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Footer;
