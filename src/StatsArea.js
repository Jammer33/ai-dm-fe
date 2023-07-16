// src/StatsArea.js
import React, { useState } from 'react';
import './StatsArea.css';

const StatsArea = ({ playerInfo }) => {
  const [health, setHealth] = useState(playerInfo.maxHealth);
  const [diceResult, setDiceResult] = useState(null);

  const rollDice = (sides) => {
    const result = Math.floor(Math.random() * sides) + 1;
    setDiceResult(`You rolled a d${sides}: ${result}`);
  };

  return (
    <div className="stats-area">
      <p>Health: {health}/{playerInfo.maxHealth}</p>
      <div className="dice-buttons">
        <button onClick={() => rollDice(4)}>Roll d4</button>
        <button onClick={() => rollDice(6)}>Roll d6</button>
        <button onClick={() => rollDice(8)}>Roll d8</button>
        <button onClick={() => rollDice(10)}>Roll d10</button>
        <button onClick={() => rollDice(12)}>Roll d12</button>
        <button onClick={() => rollDice(20)}>Roll d20</button>
      </div>
      {diceResult && <p className="dice-result">{diceResult}</p>}
    </div>
  );
};

export default StatsArea;
