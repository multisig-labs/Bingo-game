import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderImg from '../assets/images/header-img';
import BingoIcon from '../assets/images/bingo-logo';
import Sponsors from '../assets/images/sponsors';
import { SupabaseContext } from '../SupabaseContext';

const LoginPage = () => {
  const [twitterHandle, setTwitterHandle] = useState('');
  const [telegram, setTelegram] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const { supabaseClient } = useContext(SupabaseContext);


  // useEffect(() => {
  //   const twitter = localStorage.getItem("twitterHandle")
  //   const tg = localStorage.getItem("telegram")

  //   if (twitter && tg) {
  //     navigate('/bingo')
  //   }
  // }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault();

    if (twitterHandle && telegram) {
      localStorage.setItem('twitterHandle', twitterHandle);
      localStorage.setItem('telegram', telegram);

      const { error } = await supabaseClient
        .from("bingo_players")
        .insert({
          telegram: telegram,
          twitter: twitterHandle
        }).select().single()

      if (error) {
        console.error("Problem inserting into supabase: ", error);
      }

      navigate('/game-directions');
    }
  };

  return (
    <div className="login-page container">
      <HeaderImg />
      <div className="line top-line"></div>
      <BingoIcon />
      <h1 className="welcome">Welcome To Blocktail's Bingo Game</h1>


      <form onSubmit={handleLogin} className="login-form-container">
        <h2>Sign in to play</h2>
        <label htmlFor="telegram" className="login-label">
          Telegram
        </label>
        <input
          type="text"
          name="telegram"
          placeholder="@ggp_steven"
          className="login-input"
          onChange={(e) => setTelegram(e.target.value)}
        />

        <label htmlFor="twitter-handle" className="login-label">
          Twitter Handle
        </label>
        <input
          type="text"
          name="twitterHandle"
          placeholder="@gogopool_"
          className="login-input"
          value={twitterHandle}
          onChange={(e) => setTwitterHandle(e.target.value)}
        />

        <p>All of your information is kept private and we will not share it with anyone.</p>
        <button disabled={!twitterHandle && !telegram} type="submit" className="login-button">
          Continue
        </button>

      </form>
      <div className="line bottom-line">
      </div>
      <Sponsors />
    </div>
  );
};

export default LoginPage;
