import React from 'react';
import '../index.css';

const FreeModal = ({ isOpen, onClose}) => {
  if (!isOpen) return null;

  const twitterHandle = localStorage.getItem('twitterHandle');

  if (!twitterHandle) {

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="free-square">Free Square</h1>
        <p>Post a fun tweet on X and mention @GoGoPool_.
          Be sure to show your tweet to Breevie if you get Bingo!
        </p>
        <button className="dont-post-btn" onClick={onClose}>I don't want to post</button>
        <button className="open-twitter-btn" onClick={openTwitter}>Post Now!</button>
      </div>
    </div>
  );
}

const openTwitter = () => {
  const tweetText = `I just got the Free Square in Bingo! #BingGame @GoGoPool_@${twitterHandle}`;

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  window.open(tweetUrl, '_blank');
};

return (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2>Free Square.</h2>
      <p>Post a fun tweet on X and mention @GoGoPool_.
        Be sure to show your tweet to Breevie if you get Bingo!
      </p>
      <button className="dont-post" onClick={onClose}>I Don't Want<span className="no-post-span">To Post</span></button>
      <button className="post-now" onClick={openTwitter}>Post Now!</button>
    </div>
  </div>
);
};

export default FreeModal;