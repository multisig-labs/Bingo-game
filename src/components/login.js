import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import HeaderImg from '../assets/images/header-img';
import BingoIcon from '../assets/images/bingo-logo';
import Sponsors from '../assets/images/sponsors';



const LoginPage = () => {
  const [twitterHandle, setTwitterHandle] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setTwitterHandle(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (twitterHandle) {
      localStorage.setItem('twitterHandle', twitterHandle);
    

    navigate('./game-directions');
  }else{
    alert('Please enter your Twitter handle');
  }
};

  return(
    <div className="login-page container">
      <HeaderImg/>
      <div className="line"></div>
      <BingoIcon/>
      <h1 className="welcome">Welcome To Blocktail's Bingo Game</h1>
      

      <form onSubmit={handleLogin} className="login-form">
          <h2>Sign in to play</h2>
        <label htmlFor="wallet-address" className="twitter-handle-label">
          Wallet Address
        </label>
        <input
          type="text"
          id="wallet-address"
          name="wallet-address"
          placeholder="0x329sdfadsghbngvdgb"
          className="twitter-handle-input"
          />

        <label htmlFor="twitter-handle" className="twitter-handle-label">
          Twitter Handle
        </label>
        <input
          type="text"
          id="twitter-handle2"
          name="twitterHandle"
          placeholder="@twitter_handle"
          className="twitter-handle-input"
          value={twitterHandle}
          onChange={handleInputChange}
          />
          
        <p>All of your information is kept private and we will not share it with anyone.</p>
        <button type="submit" className="login-button">
          Continue
        </button>
      </form> 
    <div className="line"></div>
    <Sponsors/>
  </div>
  );
};

export default LoginPage;