import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';


//Images
import HeaderImg from '../assets/images/header-img';
import BingoIcon from '../assets/images/bingo-logo';
import Sponsors from '../assets/images/sponsors';


const GameDirections = () => {
  const navigate = useNavigate();

  const handleAcceptRules = () => {
    navigate('/bingo');
  };

  return (
    <div className="container ">
      <HeaderImg />
      <div className="line top-line"></div>
      <BingoIcon />
      <h1 className="welcome">Welcome to Blocktail's Bingo Game</h1>
      <div className="directions">
        <h3 className="how-to-win">Rules:</h3>
        <div className="inner-directions">
          <p>Go around the room to network with people. When you meet someone on the list,
            <span className='emphasis'>&nbsp;take a selfie with them</span> for proof. The first person
            to fill out <span className='emphasis'>all 9 squares</span> wins! Find Breevie immediately,
            show him the selfies, and claim your prize.
            <span className="good-luck">Good luck!</span></p>
        </div>



        <button className="accept-btn" onClick={handleAcceptRules}>
          I'm Ready to Play!
        </button>
      </div>
      <div className="line"></div>
      <Sponsors />
    </div>
  )
};

export default GameDirections;
