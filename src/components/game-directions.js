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
        <h3 className="how-to-win"> Here's how to win</h3>
        <div className="inner-directions">
          <p>Go around the room to network with people. When you meet someone on the list, take a self with them for verfication proof. The first person to complete a row, column, or diagnol of squares of people will be in Bingo mode. Find Breevie immediately, show him the selfies, and claim your prize. Until all the criteria is met,<br /> the game will go on.
            <span className="dont-forget">Don’t forget and good luck!</span></p>
        </div>



        <button className="accept-btn" onClick={handleAcceptRules}>
          I understand, and I'm ready to play!
        </button>
      </div>
      <div className="line"></div>
      <Sponsors />
    </div>
  )
};

export default GameDirections;
