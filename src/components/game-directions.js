import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';


const GameDirections = () => {
  const navigate = useNavigate();

  const handleAcceptRules = () => {
    console.log("button clicked, navigate to bingo");
    navigate('/bingo');
  };

  return(
    <div className="container ">
      <h2>GoGopool and Uplink present</h2>
      <h1>Bingo Logo</h1>
      <p>Welcome to Blocktail's Bingo Game</p>

      <div className="directions">
        <h3 className="sub-heading"> Here's how to win</h3>
        <p>Go around the room to network with people. When you meet someone on the list, take a self with them for verfication proof. The first person to complete a row, column, or diagnol of squares of people will be in Bingo mode. Find Breevie immediately, show him the selfies, and claim your prize. Until all the criteria is met, the game will go on.</p>
        <p>Don’t forget and good luck!</p>

        <button className="accept-btn" onClick={handleAcceptRules}>
          I understand, and I'm ready to play!
        </button>
      </div>
    </div>
  )
};

export default GameDirections;
