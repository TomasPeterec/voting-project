import { createTheme } from '@mui/material/styles'
import { fCoef, fontColorPrime, fontColorGray, formDescriptionColor } from './generalVariables'

const votingTheme = createTheme({
  colors: {
    primary: '#186DFD',
    secondary: '#FF4081'
    // ... other color configurations
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    lineHeight: 1.5,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    h1: {
      fontSize: 61.06 / fCoef,
      fontWeight: 'bold',
      color: fontColorPrime
    },
    h3: {
      fontSize: 37.74 / fCoef,
      fontWeight: 100,
      color: fontColorGray
    },
    formDescription: {
      fontSize: 37.74 / fCoef,
      fontWeight: 100,
      color: formDescriptionColor
    },
    inputRequired: {
      fontSize: 29.67 / fCoef,
      fontWeight: 100,
      color: fontColorPrime
    },
    titleOfItem: {
      fontSize: 48 / fCoef / 1.272,
      fontWeight: 100,
      color: fontColorPrime
    }
  }
})

export default votingTheme
