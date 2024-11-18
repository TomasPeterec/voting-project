import React, { useState, CSSProperties } from 'react';

// Define the types for props
interface ButtonProps {
  title: string; // Required prop
  urlValue?: string; // Optional prop
  textColor?: string; // Optional prop
  active?: boolean;
  buttonSize: number;
}

// Functional component with destructured props
const MenuButton: React.FC<ButtonProps> = ({ title, urlValue, textColor, active, buttonSize }) => {
  // State to manage hover effect
  const [isHovered, setIsHovered] = useState(false);

  const radius = buttonSize / 2;
  const sidePadding = buttonSize / 2.540650407;

  // Define the style object
  const styles: { thinlineButton: CSSProperties } = {
    thinlineButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: buttonSize,
      padding: '0.2vw',
      color: textColor || 'inherit', // Default to inherit if no color is provided
      textAlign: 'center',
      fontSize: '1vw',
      border: '1px solid rgba(255, 255, 255, 0.17)',
      borderRadius: radius,
      paddingLeft: sidePadding,
      paddingRight: sidePadding,
      backgroundColor: active ? 'rgba(24, 109, 253, 0.3)' : isHovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
      textDecoration: 'none', // Remove underline for link
      transition: 'background-color 0.3s ease', // Smooth transition for background color
    },
  };

  return (
    <a
      href={urlValue || '#'} // Fall back to a non-existent anchor if urlValue is not provided
      style={styles.thinlineButton}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false
    >
      {title}
    </a>
  );
};

export default MenuButton;
