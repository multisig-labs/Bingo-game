import React from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import Footer from './footer';

const WinningPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {clickedTiles} = location.state || {};

  //Check if the Bingo card is fully clicked
  const isCardFullyClicked = clickedTiles && clickedTiles.every(row => row.every(tile => tile === true));

  if (!isCardFullyClicked) {
    navigate('/');
    return null;
  }

  return (
    <div className="winner">
      <h1>Congratulations!</h1>
      <p>You've completed a full blackout Bingo!</p>
      <p>All tiles on your Bingo card have been clicked.</p>
    </div>
  );
};

export default WinningPage;
