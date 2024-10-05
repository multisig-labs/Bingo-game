import React from 'react';
import { useLocation } from 'react-router-dom';

const WinnerPage = () => {
  const location = useLocation();

  // Retrieve the Twitter handle from localStorage
  const twitterHandle = location.state?.twitterHandle;

  return (
    <div className="winner-page">
      <h1>Congratulations!</h1>
      {twitterHandle ? (
        <p>You won, {twitterHandle}!</p>
      ) : (
        <p>You won, but we couldn't retrieve your Twitter handle.</p>
      )}
      <button onClick={() => window.location.href = '/'}>Go Back to Home</button>
    </div>
  );
};

export default WinnerPage;

