import React from 'react';
import { useNavigate } from 'react-router-dom'; 


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
        <div className="inner-bingo-content">
            <h1>Bingo!</h1>
            <p>
              The game isn't over!
              Find Breevie now and show
              him your squares and selfies.
            </p>
          </div>
        <button className="keep-playing-button" onClick={handleBackToBingo}>
          Oops, I forgot to take selfies.<br/>
          Keep playing.
        </button>
      </div>
      <div className="line bottom-line"></div>
      <Sponsors />
    </div>
  );
};

export default BingoMessage;
