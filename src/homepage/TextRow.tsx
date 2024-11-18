import React, { CSSProperties } from 'react';

interface TextRowProps {
  title: string;
  leftContent: string;
  rightContent: string;
  backColor: string;
}

const TextRow: React.FC<TextRowProps> = ({ title, leftContent, rightContent, backColor }) => {
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
      maxWidth: '3000px',
    },
    articleItSelf: {
      backgroundColor: backColor,
      borderRadius: '1.5625vw',
      padding: '3.125vw',
    },
    boxStyle: {},
    plainText: {
      fontSize: '15px',
    },
    HeadlineText: {
      color: '#004FAB',
      fontSize: '37px',
    },
  };

  return (
    <div className="container" style={styles.containerStyle}>
      <div style={styles.articleItSelf}>
        <div className="row">
          <div className="col-12 col-md-12 col-xl-12" style={styles.boxStyle}>
            <h2 style={styles.HeadlineText}>
              <b>{title}</b>
            </h2>
          </div>
          <div className="col-12 col-md-12 col-xl-6" style={styles.boxStyle}>
            <p style={styles.plainText}>{leftContent}</p>
          </div>
          <div className="col-12 col-md-12 col-xl-6" style={styles.boxStyle}>
            <p style={styles.plainText}>{rightContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextRow;
