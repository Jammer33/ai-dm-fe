// src/Homepage.js
import React from 'react';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to the D&D AI Dungeon Master</h1>
        <p>Your virtual guide to an immersive and thrilling adventure!</p>
      </header>

      <section className="homepage-content">
        <div className="homepage-feature">
          <h2>Dynamic Storytelling</h2>
          <p>Our AI Dungeon Master crafts engaging narratives tailored to your characters and decisions, providing a unique experience in every session.</p>
        </div>
        <div className="homepage-feature">
          <h2>Adaptive Encounters</h2>
          <p>Experience challenging encounters, designed by the AI to adapt to your party's strengths and weaknesses, keeping the game fresh and exciting.</p>
        </div>
        <div className="homepage-feature">
          <h2>Character Management</h2>
          <p>Easily create, manage, and level up your characters using our intuitive character sheet system, designed to streamline the process and let you focus on the adventure.</p>
        </div>
      </section>
      {/* button that routes to player page */}
        <button className="homepage-button"  >Start Adventure</button>

      <footer className="homepage-footer">
        <p>&copy; 2023 D&D AI Dungeon Master. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
