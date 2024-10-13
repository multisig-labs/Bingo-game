import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './'

import HeaderImg from '../assets/images/header-img';
import BingoIcon from '../assets/images/bingo-logo';
import Sponsors from '../assets/images/sponsors';

const BingoMessage = () => {
  const navigate = useNavigate(); 

  const handleBackToBingo = () => {
    navigate('/bingo'); 
  };

  return (
    <div className="container">
      <HeaderImg />
      <div className="line top-line"></div>
      <BingoIcon />
      <div className="bingo-message">
        <h1>Bingo!</h1>
        <p>
          The game isn't over!<br />
          Find Breevie now and show<br />
          him your squares and selfies
        </p>
        <button className="keep-playing-button" onClick={handleBackToBingo}>
          Oops, I was wrong. Keep playing.
        </button>
      </div>
      <div className="line bottom-line"></div>
      <Sponsors />
    </div>
  );
};

export default BingoMessage;
