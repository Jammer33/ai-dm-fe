// src/PlayerPage.js
import React, { useState } from 'react';
import './PlayerPage.css';

const PlayerPage = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [playerInfo, setPlayerInfo] = useState({
    name: 'John Doe',
    characterClass: 'Wizard',
    race: 'Elf',
    level: 5,
  });

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission and update outputText
    setOutputText(inputText);
    // call API
    // fetch('localhost:3000', {)
  };

  const handleVoiceInput = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
  
      recognition.start();
  
      recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      });
  
      recognition.addEventListener('error', (event) => {
        console.error('Error occurred in recognition:', event.error);
      });
    } else {
      alert('SpeechRecognition not supported in your browser. Please use the latest version of Chrome or Firefox.');
    }
  };

  return (
    <div className="player-page">
      <header className="player-info">
        <h2>{playerInfo.name}</h2>
        <p>{playerInfo.characterClass} ({playerInfo.race})</p>
        <p>Level: {playerInfo.level}</p>
      </header>

      <section className="interaction">
        <textarea
          className="input-text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your message here"
        ></textarea>
        <button className="voice-input" onClick={handleVoiceInput}>Voice Input</button>
        <button className="submit" onClick={handleSubmit}>Submit</button>
      </section>

      <section className="output">
        <textarea
          className="output-text"
          value={outputText}
          readOnly
          placeholder="AI response will appear here"
        ></textarea>
      </section>
    </div>
  );
};

export default PlayerPage;
