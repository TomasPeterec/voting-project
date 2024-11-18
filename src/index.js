import reportWebVitals from './report-web-vitals';
import { ThemeProvider } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import votingTheme from './css-and-material/theme';
import 'bootstrap/dist/css/bootstrap.min.css';

import DashBoardAbout from './dashboard/about/dash-board-about';
import DashboardTutorials from './dashboard/tutorials/dash-board-tutorials';
import DashboardDistribute from './dashboard/votings/distribute/dash-board-distribute';
import DashboardEdit from './dashboard/votings/edit/dash-board-edit';
import DashBoardVotings from './dashboard/votings/main/dash-board-votings';
import DashboardStats from './dashboard/votings/statistics/dash-board-stats';
import DashboardTest from './homepage/DashboardTest';
import EmailNotification from './homepage/EmailNotification';
import IndexScreen from './homepage/IndexScreen';
import LogInTo from './homepage/LogInTo';
import LoginForm from './registration-and-login/login-form';
import RegisterTo from './homepage/RegisterTo';
import SetUsername from './SetUsername';

// import TestOfTest from './testTest/TestOfTest'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<IndexScreen />} />
        <Route path="/home" element={<IndexScreen />} />
        <Route path="/votings" element={<DashBoardVotings />} />
        <Route path="/set-username" element={<SetUsername />} />
        <Route path="/registration" element={<RegisterTo />} />
        <Route path="/login" element={<LogInTo />} />
        <Route path="/tutorials" element={<DashboardTutorials />} />
        <Route path="/about" element={<DashBoardAbout />} />
        <Route path="/votings/edit" element={<DashboardEdit />} />
        <Route path="/votings/statistics" element={<DashboardStats />} />
        <Route path="/votings/distribution" element={<DashboardDistribute />} />
        <Route path="/votings/email/notification" element={<EmailNotification />} />
        <Route path="/votings/dashboard" element={<DashboardTest />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={votingTheme}>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </ThemeProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
