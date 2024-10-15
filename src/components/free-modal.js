import React from 'react';
import '../index.css';

const FreeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const twitterHandle = localStorage.getItem('twitterHandle');

  const openTwitter = () => {
    const tweetText = `I just got the Free Square in Bingo! #BingGame @GoGoPool_@${twitterHandle}`;

    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

    window.open(tweetUrl, '_blank');
  };


  if (!twitterHandle) {

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h1 className="free-square">Photo Square</h1>
          <p>Post a fun tweet on X and mention <span className="gogoPool-twitter">@GoGoPool_</span>
            Be sure to show your tweet to Breevie if you get Bingo!
          </p>
          <div className="btn-container">
            <button className="dont-post-btn" onClick={onClose}>I don't want to post</button>
            <button className="open-twitter-btn" onClick={openTwitter}>Post Now!</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Photo Square</h2>
        <p>Post a fun tweet on X and<br /> mention<span className="gogoPool-twitter"> @GoGoPool_</span></p>
        <p>Be sure to show your tweet<br /> to Breevie if you get Bingo!</p>

        <div className="btn-container">
          <button className="dont-post" onClick={onClose}>I Don't Want <br /> To Post</button>
          <button className="post-now" onClick={openTwitter}>Post Now!</button>
        </div>
      </div>
    </div>
  );
};

export default FreeModal;
