import React from 'react';
import { Link } from 'react-router-dom';

const BingoMessage = () => {
  return (
    <div className="bingo-message">
      <h2>GoGopool and Uplink present</h2>
      <h1>Bingo Logo</h1>

      <h3>Bingo!</h3>
      <p>The game isn't over! Find Breevie now and 
        show him your squares and selfies.</p>
      <Link to="/bingo" className="keep-playing-button">
        Oops, I was wrong. Keep playing.
      </Link>
    </div>
  );
};

export default BingoMessage;