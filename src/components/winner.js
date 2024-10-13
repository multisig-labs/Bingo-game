import React, { useEffect, useState } from 'react';


//Images
import HeaderImg from '../assets/images/header-img';
import BingoIcon from '../assets/images/bingo-logo';
import Sponsors from '../assets/images/sponsors';


const WinnerPage = () => {
  const [twitterHandle, setTwitterHandle] = useState('');

  useEffect(() => {
    const handle = localStorage.getItem('twitterHandle');

    if (handle) {
      setTwitterHandle(handle);
    }
  }, []); 

  return (
    <div className="container">
      <HeaderImg />
      <div className="line top-line"></div>
      <BingoIcon />
      {twitterHandle ? (
        <div className="winner-page">
          <h1>Congratulations Winner!</h1> 
          <p>@{twitterHandle}</p> 
        </div>
      ) : (
        <p>You won, but we couldn't retrieve your Twitter handle.</p>
      )}
      <p className="thanks-for-playing">Thanks for playing!</p>
      <div className="line"></div>
    </div>
  );
};

export default WinnerPage;
