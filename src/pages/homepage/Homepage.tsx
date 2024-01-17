// src/Homepage.js
import React, { useState } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import ValueProp from './components/valueProp/ValueProp';
import Hero from '../../components/hero/Hero';
import Footer from '../../components/footer/Footer';
import SignupCTA from './components/signupCTA/SignupCTA';



const Homepage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(email, password);
    // make call
    // if successful, route to player page
    // else, display error message
    fetch('https://localhost:3001/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div>
      <Navbar />
      <Hero
        title='Embark on a Journey Where You Are the Story'
        subtitle='become a noble hero rescuing a kingdom in peril, a cunning rogue mastering the art of deception, or a wise sorcerer unlocking the secrets of the arcane. Explore a place where imagination is your only limit.'
      />
      <ValueProp 
        images={['value_prop_1.png']} 
        title="Unlimited Freedom: The Choices are Yours" 
        bodyText="From “Choose Your Own Adventure” books to this: a world where every decision you make shapes the narrative in real-time. Your choices, your story."
        isTextLeft={false}
      />

{/* "It's Dangerous to Go Alone! Take This."
—Your Friends!

Team up with friends to explore enchanted forests, delve into dark dungeons, and conquer epic quests. Our Multiplayer Experience lets you share the triumphs and tribulations of your unique adventure. Because every story becomes legendary when shared. */}

      <ValueProp
        images={['human.png', 'elf.png', 'dragonborn.png', 'tiefling.png']}
        title="It's Dangerous to Go Alone! Take This."
        bodyText="Team up with friends to explore enchanted forests, delve into dark dungeons, and conquer epic quests. Our Multiplayer Experience lets you share the triumphs and tribulations of your unique adventure. Because every story becomes legendary when shared."
        isTextLeft={true}
      />

{/* Capture and Share Epic Moments!

Every decision, every interaction, every twist in your adventure is unique. Why keep it to yourself? With our "Share this Moment" tool, immortalize those epic moments in your campaign, turning them into stories waiting to be told.

Selected moments are not just plain text! Dive deeper into the story with AI-generated scenes painting a vivid picture of your adventure. */}

      <ValueProp
        images={['photo.png']}
        title="Capture and Share Epic Moments!"
        bodyText="Every decision, every interaction, every twist in your adventure is unique. Why keep it to yourself? With our Share this Moment tool, immortalize those epic moments in your campaign, turning them into stories waiting to be told. Selected moments are not just plain text! Dive deeper into the story with AI-generated scenes painting a vivid picture of your adventure."
        isTextLeft={false}
      />
      <SignupCTA />
      <Footer />
    </div>
  );
};

export default Homepage;
