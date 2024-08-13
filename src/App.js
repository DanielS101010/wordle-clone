import React, { useState } from 'react';
import './App.css';

const words = ['APFEL', 'BLUME', 'LAMPE', 'HAFEN', 'FRUST', 'GABEL', 'TEICH', 'WETTE','TORTE'];
const targetWord = words[Math.floor(Math.random() * words.length)];

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
    } else {
      alert('Bitte geben Sie einen Benutzernamen und ein Passwort ein.');
    }
  };

  const handleKeyPress = (key) => {
    if (gameOver) return;

    if (key === 'Enter') {
      if (currentGuess.length !== 5) return;

      setGuesses(guesses.map((guess, i) => (i === currentRow ? currentGuess : guess)));

      if (currentGuess === targetWord) {
        setMessage('Herzlichen Glückwunsch! Du hast das Spiel gewonnen!');
        setGameOver(true);
      } else if (currentRow === 5) {
        setMessage('Spiel vorbei! Das Wort war: ' + targetWord);
        setGameOver(true);
      } else {
        setCurrentGuess('');
        setCurrentRow(currentRow + 1);
      }
    } else if (key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const getBgColor = (letter, index) => {
    if (!targetWord.includes(letter)) return 'gray';
    if (targetWord[index] === letter) return 'green';
    return 'yellow';
  };

  if (!isLoggedIn) {
    return (
      <div className="login">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>login</button>

        </div>
    );
  }

  return (
    <div className="App">
      <h1>Wordle</h1>
      <div className="grid">
        {guesses.map((guess, i) => (
          <div key={i} className="row">
            {Array(5)
              .fill('')
              .map((_, j) => (
                <div
                  key={j}
                  className="cell"
                  style={{
                    backgroundColor: guess && i <= currentRow ? getBgColor(guess[j], j) : 'white',
                  }}
                >
                  {guess[j] || (i === currentRow ? currentGuess[j] : '')}
                </div>
              ))}
          </div>
        ))}
      </div>
      <div className="keyboard">
        {['QWERTZUIOP', 'ASDFGHJKL', 'YXCVBNM'].map((row, i) => (
          <div key={i} className="keyboard-row">
            {row.split('').map((key) => (
              <button key={key} onClick={() => handleKeyPress(key)}>
                {key}
              </button>
            ))}
          </div>
        ))}
        

        {/*Tastatur mit veränderter  */}
        {/*['ABCDEFGHIJ', 'KLMNOPQR', 'STVWXYZ'].map((row, i) => (
          <div key={i} className="keyboard-row">
            {row.split('').map((key) => (
              <button key={key} onClick={() => handleKeyPress(key)}>
                {key}
              </button>
            ))}
          </div>
        ))*/}



        <div className="keyboard-row">
          <button onClick={() => handleKeyPress('Enter')}>Enter</button>
          <button onClick={() => handleKeyPress('Backspace')}>Backspace</button>
        </div>
      </div>
      {gameOver && <div className="message">{message}</div>}
    </div>
  );
};

export default App;
