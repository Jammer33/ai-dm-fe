import './App.css';
import PlayerPage from './PlayerPage';
import Homepage from './pages/homepage/Homepage';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React from 'react';
import PricingPage from './pages/pricing/PricingPage';
import SignupPage from './pages/signup/SignupPage';
import LoginPage from './pages/login/LoginPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/player" element={<PlayerPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Routes>
    </Router>
  );
}

export default App;
