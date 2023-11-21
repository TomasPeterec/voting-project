import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import RegAndLoginButton from './front/RegAndLoginButton';
import Box from '@mui/material/Box';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import theme from './cssAndMaterial/theme';
import { roundedBoxStyles, mobileStyles } from './cssAndMaterial/styles';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import DashBoardVotings from './dashboard/DashBoardVotings';
import RegistrationForm from "./registration_and_login/RegistrationForm";
import LoginForm from "./registration_and_login/LoginForm";
import DashboardTutorials from './dashboard/DashboardTutorials';
import DashBoardAbout from './dashboard/DashBoardAbout';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<ThemedApp/>} />
          <Route path="/votings" element={<DashBoardVotings/>} />
          <Route path="/registration" element={<RegistrationForm/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/tutorials" element={<DashboardTutorials/>} />
          <Route path="/about" element={<DashBoardAbout/>} />
      </Routes>
    </BrowserRouter>
  );
}

function ThemedApp() {
  const isMobile = useMediaQuery('(max-width:600px)'); // Adjust the breakpoint as needed

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isMobile ? (
          <div>
            <h1>This is the mobile screen layout</h1>
          </div>
        ) : (
          <div>
            <h1>This is the normal screen layout</h1>
          </div>
        )
      }
      <Box sx={isMobile ? mobileStyles : roundedBoxStyles}>
        <RegAndLoginButton/>
      </Box>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
