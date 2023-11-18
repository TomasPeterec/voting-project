import React from 'react';
import { Link } from 'react-router-dom';



function DashBoardMenu() {

  return(
    <>
      <div><Link to="/">Odhlasit</Link></div>
      <div><Link to="/votings">Votings</Link></div>
      <div><Link to="/tutorials">Tutorials</Link></div>
      <div><Link to="/about">About</Link></div>
    </>

  );
}




// function ThemedApp() {
//   const isMobile = useMediaQuery('(max-width:600px)'); // Adjust the breakpoint as needed

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
      
//         <h1>Nejaky nadpis</h1>
    
//         <Box sx={isMobile ? mobileStyles : roundedBoxStyles}>
//         tu je nieco v boxe
//         </Box><br/>
//         <Box sx={isMobile ? mobileStyles : roundedBoxStyles}>
//         tu je nieco v boxe
//         </Box>
      
//     </ThemeProvider>
//   );
// }

export default   DashBoardMenu;
