import React, { useEffect, useState } from 'react';

const WinnerPage = () => {
  // State to hold the winner's Twitter handle
  const [twitterHandle, setTwitterHandle] = useState('');

  useEffect(() => {
    // Get the Twitter handle from localStorage
    const handle = localStorage.getItem('twitterHandle');

    if (handle) {
      // If it's stored, update the state
      setTwitterHandle(handle);
    }
  }, []); // Empty dependency array ensures this runs only once after component mounts

  return (
    <div className="winner-page container">
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
