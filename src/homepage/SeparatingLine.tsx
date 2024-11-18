import React, { CSSProperties } from 'react';

// Define the types for props
interface ButtonProps {
  lineLength: number; // Change to number
}

// Functional component with destructured props
const SeparatingLine: React.FC<ButtonProps> = ({ lineLength }) => {
  // Define the style object using the CSSProperties type
  const styles: { thinlineButton: CSSProperties; centralLine: CSSProperties } = {
    thinlineButton: {
      display: 'flex', // Enable flexbox
      justifyContent: 'space-between', // Align items at the ends
      alignItems: 'center', // Center items vertically
      height: '3.125vw',
      padding: '0vw',
      width: `${lineLength}vw`, // Ensure it's in the correct format
    },
    centralLine: {
      height: '1px',
      backgroundColor: 'white',
      opacity: 0.17, // Change to a number (0.17 for 17%)
      width: `${lineLength}vw`, // Ensure it's in the correct format
    },
  };

  return (
    <div style={styles.thinlineButton}>
      <div style={styles.centralLine}></div>
    </div>
  );
};

export default SeparatingLine;
