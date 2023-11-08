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

function App() {
  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/player" element={<PlayerPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/campaign' element={<CampaignPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/create-campaign' element={<CreateCampaignPage />} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
