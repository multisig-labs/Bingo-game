import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

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
      <h1>Login Page</h1>
      <p>Login with twitter</p>

      <form onSubmit={handleLogin}>
        <label htmlFor="twitter-handle" className="twitter-handle-label">
          Twitter Handle
        </label>
        <input
          type="text"
          id="twitter-handle"
          name="twitterHandle"
          placeholder="Enter your twitter handle"
          className="twitter-handle-input"
          value={twitterHandle}
          onChange={handleInputChange}
          />
      

      <button type="submit" className="login-button">
        Continue
      </button>
    </form> 
  </div>
  );
};

export default LoginPage;