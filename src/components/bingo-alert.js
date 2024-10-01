import React from 'react';
import '../index.css'; 

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>🎉 Bingo! 🎉</h2>
          <span className="close" onClick={onClose}>&times;</span>
        </div>
        <div className="modal-body">
          <p>Congratulations! You've got Bingo!</p>
          <p>Go find Breevee!</p>
        </div>
        <button className="modal-button" onClick={onClose}>Start New Game</button>
      </div>
    </div>
  );
};

export default Modal;
