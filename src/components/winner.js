import React, { useEffect, useState } from 'react';
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
    <div className="winner-page container">
      <h1>Congratulations!</h1>
      {twitterHandle ? (
        <p>You won, {twitterHandle}!</p>
      ) : (
        <p>You won, but we couldn't retrieve your Twitter handle.</p>
      )}
      <Sponsors/>
    </div>
  );
};

export default WinnerPage;
