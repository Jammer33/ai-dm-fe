// src/PlayerPage.js
import React, { useState, useEffect } from 'react';
import './PlayerPage.css';
import { socket } from './socket';

const PlayerPage = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const [playerInfo, setPlayerInfo] = useState({
    name: 'Ariel',
    characterClass: 'Wizard',
    race: 'Elf',
    level: 5,
  });

  useEffect(() => {
    console.log(document);
    console.log('PlayerPage mounted');
    console.log('socket:', socket);
    
    function onConnect() {
      console.log('Connected to server');
    }

    function onDisconnect() {
      console.log('Disconnected from server');
    }

    function onReply(message: string) {
      console.log(message);
      let formattedObj = new Map<String, String>(JSON.parse(message));

      if(formattedObj.has("player")) {
        let player = formattedObj.get("player") ?? "";
        setOutputText(outputText => outputText + "\n" + player + "\n");
      }
      
      if(formattedObj.has("message")) {
        let playerMessage = formattedObj.get("message") ?? "";
        setOutputText(outputText => outputText + "\n" + playerMessage + "\n");
      }
    }

    function onDMMessage(message: string) {
      setOutputText(outputText => outputText + message);
    }

    function onNewGame(sessionToken: string) { 
      setSessionToken(sessionToken);
    }

    function onJoinGame(previousMessagesStr: string) {
      var previousMessages = new Map<String, String>(JSON.parse(previousMessagesStr));
    
      if(previousMessages.has("DM")) {
        let message : String = previousMessages.get("DM") ?? "";
        setOutputText(outputText => outputText + "\n" + message + "\n");
        previousMessages.delete("DM");
      }

      previousMessages.forEach((message, player) => {
        setOutputText(outputText => outputText + "\n" + player + ": " + message + "\n");
      });
    }

    function onServerError(err: any) {
      console.log(`error due to ${err}`);
      setOutputText(outputText => outputText + err.toString());
    }

    function onConnectErr(err: any) {
      console.log(`connect_error due to ${err.message}`); 
      setOutputText(outputText => outputText + err.toString());
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('reply', onReply);
    socket.on('DMessage', onDMMessage);
    socket.on('newGame', onNewGame);
    socket.on('joinGame', onJoinGame);
    socket.on('error', onServerError);
    socket.on('connect_error', onConnectErr);

    return () => {
      socket.close();
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSessionTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSessionToken(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission and update outputText
    console.log(inputText);
    // use websockets to send inputText to server
    socket.emit('reply', inputText, sessionToken);
    setInputText('');
  };

  const handleNewGame = () => {
    // use websockets to send inputText to server
    const character1 = {
      name: 'Ariel',
      race: 'Elf',
      class: 'Wizard',
    };
    const character2 = {
      name: 'James',
      race: 'Human',
      class: 'Fighter',
    };
    const character3 = {
      name: 'Connor',
      race: 'Dwarf',
      class: 'Cleric',
    };

    socket.emit('newGame', [character2]);
    setInputText('');
    setOutputText('');
  };

  const handleJoinGame = () => {
    socket.emit('joinGame', sessionToken);
  };

  const handleVoiceInput = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
  
      recognition.start();
  
      recognition.addEventListener('result', (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      });
  
      recognition.addEventListener('error', (event: any) => {
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

      <section className="output">
        <textarea
          className="output-text"
          value={outputText}
          readOnly
          placeholder="AI response will appear here"
        ></textarea>
      </section>

      <section className="interaction">
        <input
          type='text'
          className="input-text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your message here"
          aria-multiline="true"
        ></input>
        <button className="voice-input" onClick={handleVoiceInput}>Voice Input</button>
        <button className="submit" onClick={handleSubmit}>Submit</button>
        <button className="submit" onClick={handleNewGame}>New Game</button>
        <button className="submit" onClick={handleJoinGame}>Join Game</button>
      </section>
      <input
          type='text'
          value={sessionToken}
          onChange={handleSessionTokenChange}
          placeholder="Enter your session token here"
        ></input>
    </div>
  );
};

export default PlayerPage;
