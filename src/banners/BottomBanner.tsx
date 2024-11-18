import React, { CSSProperties } from 'react';

interface FooterProps {
  name?: string;
}

const BottomBanner: React.FC<FooterProps> = ({ name }) => {
  const styles: {
    containerStyle: CSSProperties;
  } = {
    containerStyle: {
      width: '320px',
      height: '50px',
      backgroundColor: '#EBEBEB',
    },
  };

  return (
    <div className="container" style={styles.containerStyle}>
      {/* Add content or conditionally render something using `isMobile` here if needed */}
      {name && <p>{name}</p>}
    </div>
  );
};

export default BottomBanner;
