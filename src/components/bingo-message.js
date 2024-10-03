import React from 'react';
import { Link } from 'react-router-dom';

const BingoMessage = () => {
  return (
    <div className="bingo-message">
      <h2>YOU WON!</h2>
      <p>Congratulations, you have won the game!</p>
      <Link to="/bingo" className="keep-playing-button">
        Oops, I was wrong. Keep playing!
      </Link>
    </div>
  );
};

export default BingoMessage;