// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // your primary color
    },
    secondary: {
      main: '#ff4081', // your secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
  },
  spacing: 4,
  // other customizations...
});

export default theme;
