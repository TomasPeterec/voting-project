import reportWebVitals from './report-web-vitals';
import { ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';    
import votingTheme from './css-and-material/theme';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppStateType } from './types/types';
import { MainContext } from './contexts/MainContext';
import { useState } from 'react';

import DashBoardAbout from './dashboard/about/dash-board-about';
import DashboardTutorials from './dashboard/tutorials/dash-board-tutorials';
import DashboardEdit from 'homepage/DashboardEdit';
import DashboardMain from './homepage/DashboardMain';
import VotingForm from 'homepage/VotingForm';
import EmailNotification from './homepage/EmailNotification';
import IndexScreen from './homepage/IndexScreen';
import LogInTo from './homepage/LogInTo';
import RegisterTo from './homepage/RegisterTo';
import SetUsername from './SetUsername';
import DashboardDistribute from './homepage/DashboardDistribute';
import DashboardStatistic from './homepage/DashboardStatistic';

export default function AppRouter() {
  const [appState, setAppState] = useState<AppStateType>({
    chosenVotesId: 'no chosen', // Initialize the state with default values
    appUsername: '', // Initialize the state with default values
    chosenVotesName: '',
    idOfVotesFromMailLink: '',
    emailIdFromMailLink: '',
    emailOfVoter: '',
    actualVoteToVoting: '',
    linkVoted: '',
    voteSended: '',
  });

  const appStateSetter = (item: keyof AppStateType, value: string) => {
    setAppState((prevState) => ({
      ...prevState,
      [item]: value,
    }));
  };

  return (
    <MainContext.Provider value={{ appState, appStateSetter }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<IndexScreen />} />
          <Route path="/home" element={<IndexScreen />} />  
          <Route path="/set-username" element={<SetUsername />} />
          <Route path="/registration" element={<RegisterTo />} />
          <Route path="/login" element={<LogInTo />} />
          <Route path="/tutorials" element={<DashboardTutorials />} />
          <Route path="/about" element={<DashBoardAbout />} />
          <Route path="/votings/edit" element={<DashboardEdit />} />
          <Route path="/votings/distribution" element={<DashboardDistribute />} />
          <Route path="/votings/email/notification" element={<EmailNotification />} />
          <Route path="/votings/dashboard" element={<DashboardMain />} />
          <Route path="/votings/statictics" element={<DashboardStatistic />} />
          {/* Dynamic route with UUIDs */}
          <Route path="/voting-records/:uuid/votingform/:uuidSecond" element={<VotingForm />} />
        </Routes>
      </BrowserRouter>
    </MainContext.Provider>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
createRoot(rootElement).render(
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
