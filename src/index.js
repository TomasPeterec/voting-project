import React from 'react'
import { createRoot } from 'react-dom/client'
import reportWebVitals from './report-web-vitals'
import Box from '@mui/material/Box'
import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material'
import votingTheme from './css-and-material/theme'
import mobileWidth from './css-and-material/is-device'
import { roundedBoxStyles, mobileStyles } from './css-and-material/styles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import RegAndLoginButton from './front/reg-and-login-button'
import DashBoardVotings from './dashboard/votings/main/dash-board-votings'
import RegistrationForm from './registration-and-login/RegistrationForm'
import LoginForm from './registration-and-login/login-form'
import DashboardTutorials from './dashboard/tutorials/dash-board-tutorials'
import DashBoardAbout from './dashboard/about/dash-board-about'
import DashboardEdit from './dashboard/votings/edit/dash-board-edit'
import DashboardStats from './dashboard/votings/statistics/dash-board-stats'
import DashboardDistribute from './dashboard/votings/distribute/dash-board-distribute'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ThemeApp />} />
        <Route path="/votings" element={<DashBoardVotings />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/tutorials" element={<DashboardTutorials />} />
        <Route path="/about" element={<DashBoardAbout />} />
        <Route path="/votings/edit" element={<DashboardEdit />} />
        <Route path="/votings/statistics" element={<DashboardStats />} />
        <Route path="/votings/distribution" element={<DashboardDistribute />} />
      </Routes>
    </BrowserRouter>
  )
}

function ThemeApp() {
  // Adjust the breakpoint as needed
  const isMobile = useMediaQuery(`(max-width:${mobileWidth})`)

  return (
    <ThemeProvider theme={votingTheme}>
      <CssBaseline />
      {isMobile ? (
        <div>
          <h1>This is the mobile screen layout</h1>
        </div>
      ) : (
        <div>
          <h1>This is the normal screen layout</h1>
        </div>
      )}
      <Box sx={isMobile ? mobileStyles : roundedBoxStyles}>
        <RegAndLoginButton />
      </Box>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ThemeProvider theme={votingTheme}>
    <AppRouter />
  </ThemeProvider>
  // {/* </React.StrictMode> */}
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
