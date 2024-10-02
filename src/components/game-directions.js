import React from 'react';
import {useHistory} from 'react-router-dom';


const GameDirections = () => {
  const history = useHistory();

  const handleAcceptRules = () => {
    history.push('/bingo');
  };

  return(
    <div>
      <h2>GoGopool and Uplink present</h2>
      <h1>Bingo Logo</h1>
      <p>Welcome to Blocktail's Bingo Game</p>

      <div className="instructions">
        <h3> Here's how to win</h3>
        <p>Go around the room to network with people. When you meet someone on the list, take a self with them for verfication proof. The first person to complete a row, column, or diagnol of squares of people will be in Bingo mode. Find Breevie immediately, show him the selfies, and claim your prize. Until all the criteria is met, the game will go on. Don’t forget and good luck!</p>

        <button onClick={handleAcceptRules}>
          I understand, and I'm ready to play!
        </button>
      </div>
    </div>
  )
};

export default GameDirections;
