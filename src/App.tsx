import './App.css';
import PlayerPage from './PlayerPage';
import Homepage from './pages/homepage/Homepage';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React from 'react';
import PricingPage from './pages/pricing/PricingPage';
import SignupPage from './pages/signup/SignupPage';
import LoginPage from './pages/login/LoginPage';
import { AuthProvider } from './provider/AuthProvider';
import CampaignPage from './pages/campaign/CampaignPage';
import Dashboard from './pages/dashboard/Dashboard';
import CreateCampaignPage from './pages/createCampaign/CreateCampaignPage';
import '@fontsource/space-grotesk';
import ProtectedRoute from './util/ProtectedRoute';
import { Box, CssVarsProvider, Sheet, Stack, extendTheme } from '@mui/joy';

const theme = extendTheme({
  spacing: 0,
  fontFamily: {
    display: 'Space Grotesk',
    body: 'Space Grotesk',
  },
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          50: '#c68afe', // lightest shade
          100: '#ba72fd',
          200: '#af5bfd',
          300: '#a343fd',
          400: '#982cfc',
          500: '#8c14fc', // your base color
          600: '#7e12e3',
          700: '#7010ca',
          800: '#620eb0',
          900: '#540c97', // darkest shade
        },
      },
    },
  },
});

function App() {
  return (
    <CssVarsProvider theme={theme} defaultMode='dark'>
      <AuthProvider>
        <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/player" element={<PlayerPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path='/campaign' element={<CampaignPage />} />
              <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path='/create-campaign' element={<CreateCampaignPage />} />
            </Routes>
        </Router>
      </AuthProvider>
    </CssVarsProvider>
  );
}

export default App;
