import React from 'react';
import { useNavigate } from 'react-router-dom';

const BingoMessage = ({close}) => {
  const navigate = useNavigate();

  const handleBackToBingo = () => {
    close();
    navigate('/bingo');
  
};

  return (
    <div className="bingo-message">
      <h2>GoGopool and Uplink present</h2>
      <h1>Bingo Logo</h1>

      <h3>Bingo!</h3>
      <p>The game isn't over! Find Breevie now and 
        show him your squares and selfies.</p>
      <button className="keep-playing-button" onClick={handleBackToBingo}>
        Oops, I was wrong. Keep playing.
      </button>
    </div>
  );
};

export default BingoMessage;