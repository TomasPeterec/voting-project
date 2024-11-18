import React, { useRef, useState, CSSProperties } from 'react';
import { UseWidthUpdater } from './UseWidthUpdater'; // Import the custom hook

// Define the types for props
interface roundedBorderProps {
  title?: string; // Required prop
  subtitle?: string; // Optional prop
}

// Functional component with destructured props
const HeroCell: React.FC<roundedBorderProps> = ({ title, subtitle }) => {
  const containerRef = useRef<HTMLDivElement>(null); // Create a reference to the container
  const [width, setWidth] = useState(0); // Store the container's width

  // Use the external hook for width updating logic
  UseWidthUpdater(containerRef, setWidth);

  const fontMultiplicator = 0.95;

  // Define the style object using the CSSProperties type
  const styles: {
    roundedBorder: CSSProperties;
    glassEfectBox: CSSProperties;
    subheadlineText: CSSProperties;
    headlineText: CSSProperties;
    headlineDiv: CSSProperties;
  } = {
    roundedBorder: {
      display: 'flex', // Enable flexbox
      flexDirection: 'column', // Stack items vertically
      justifyContent: 'space-between', // Space between items, pushes glassEfectBox to the bottom
      alignItems: 'flex-start', // Align items to the start horizontally
      height: width, // Ensure the container has a height
      width: '100%',
      padding: '0.625vw',
      color: 'white',
      textAlign: 'left', // Align text to the left
      fontSize: '1vw',
      border: '1px solid rgba(255, 255, 255, 0.17)',
      borderRadius: '1.5625vw',
    },
    glassEfectBox: {
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(255, 255, 255, 0.10)',
      borderRadius: '0.9vw',
      padding: width / 25,
      marginTop: width / 85, // This will push the glass effect box to the bottom
    },
    subheadlineText: {
      fontSize: (width / 12.72) * fontMultiplicator,
      padding: '0px',
      margin: '0px',
    },
    headlineText: {
      fontSize: (width / 10) * fontMultiplicator,
      textAlign: 'left', // Ensure the headline is left-aligned
      padding: width / 25,
      margin: '0px',
      paddingTop: width / 34,
    },
    headlineDiv: {
      height: '100%',
      backgroundColor: 'purple',
    },
  };

  return (
    <div ref={containerRef} style={styles.roundedBorder}>
      <div style={styles.headlineDiv}></div>
      <div>
        <h2 style={styles.headlineText}>
          <b>{title}</b>
        </h2>
      </div>
      <div style={styles.glassEfectBox}>
        <h3 style={styles.subheadlineText}>{subtitle}</h3>
      </div>
    </div>
  );
};

export default HeroCell;
