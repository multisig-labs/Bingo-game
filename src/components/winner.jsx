import React, { useEffect, useState } from 'react';


//Images
import HeaderImg from '../assets/images/header-img';
import BingoIcon from '../assets/images/bingo-logo';
import Star1 from '../assets/images/star-1';
import Star2 from '../assets/images/star-2';
import Star3 from '../assets/images/star-3';
import Star4 from '../assets/images/star-4';
import Star5 from '../assets/images/star-5';
import Star6 from '../assets/images/star-6';
import StarBox from '../assets/images/star-box';



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
      <Star1/>
      <Star2/>
      <Star3/>
      <Star4/>
      <Star5/>
      <Star6/>
      <StarBox/>
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
