


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import FreeModal from './free-modal';

// Images
import Sponsors from '../assets/images/sponsors';
import HeaderImg from '../assets/images/header-img';
import BingoIcon from '../assets/images/bingo-logo';
import GameEnds from '../assets/images/game-ends';

const generateBingoCard = () => {
  const card = Array.from({ length: 3 }, () => Array(3).fill(null));
  card[1][1] = "Free"; 
  return card;
};

const names = [
  { firstName: "Juan Manuel", lastName: "Salgado", company: "Uplink", position: "Argentina Rep" },
  { firstName: "Alejo", lastName: "Miguez", company: "Uplink", position: "Argentina Rep" },
  { firstName: "Damaris Valero", lastName: "Scarpa", company: "Uplink", position: "Chief Revenue Officer" },
  { firstName: "Aldrin", lastName: "D'Souza", company: "Uplink", position: "VP of Product" },
  { firstName: "Take a picture at the Photo Booth", lastName: "", company: "", position: "" },
  { firstName: "Breevie", lastName: "", company: "GoGoPool", position: "Head of Growth" },
  { firstName: "Budd", lastName: "White", company: "GoGoPool", position: "Head of Product" },
  { firstName: "Riad", lastName: "Wahby", company: "Cubist", position: "Co-Founder & CEO" },
  { firstName: "Carlos", lastName: "Lei", company: "", position: "CEO & Founder" }
];

const Bingo = () => {
  const navigate = useNavigate();
  const [bingoCard, setBingoCard] = useState(() => {
    const savedBingoCard = localStorage.getItem("bingoCard");
    return savedBingoCard ? JSON.parse(savedBingoCard) : generateBingoCard();
  });

  const [clickedTiles, setClickedTiles] = useState(() => {
    const savedClickedTiles = localStorage.getItem("clickedTiles");
    return savedClickedTiles ? JSON.parse(savedClickedTiles) : Array(3).fill(null).map(() => Array(3).fill(false));
  });

  const [bingoCount, setBingoCount] = useState(() => {
    const savedBingoCount = localStorage.getItem("bingoCount");
    return savedBingoCount ? JSON.parse(savedBingoCount) : 0;
  });

  const [bingoTiles, setBingoTiles] = useState(() => {
    const savedBingoTiles = localStorage.getItem("bingoTiles");
    return savedBingoTiles ? JSON.parse(savedBingoTiles) : [];
  });

  const [gameOver, setGameOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [isFreeModalOpen, setIsFreeModalOpen] = useState(false);
  const [blackout, setBlackout] = useState(false); 

  const handleTileClick = (rowIndex, colIndex) => {
    if (clickedTiles[rowIndex][colIndex] || gameOver) return;

    const newClickedTiles = clickedTiles.map((row, rldx) =>
      row.map((clicked, cldx) => (rldx === rowIndex && cldx === colIndex ? true : clicked))
    );

    setClickedTiles(newClickedTiles);

    const { newBingoCount, newBingoTiles } = findBingos(newClickedTiles);

    if (newBingoCount > bingoCount) {
      setBingoCount(newBingoCount);
      setBingoTiles(newBingoTiles);

      // Save game state in localStorage when a bingo is found
      localStorage.setItem("clickedTiles", JSON.stringify(newClickedTiles));
      localStorage.setItem("bingoCount", newBingoCount);
      localStorage.setItem("bingoTiles", JSON.stringify(newBingoTiles));

      navigate('/bingo-message');
    }

    const isCardFullyClicked = newClickedTiles.every(row => row.every(tile => tile === true));

    if (isCardFullyClicked) {
      setBlackout(true); // Set blackout state to true
      setGameOver(true); // Mark game as over
      navigate('/winner');  // Redirect to the winner page when blackout occurs
    } else {
      setBlackout(false); // Reset blackout state if it's not a blackout
    }

    if (rowIndex === 1 && colIndex === 1) {
      setIsFreeModalOpen(true);
    }
  };

  const findBingos = (tiles) => {
    let bingoCount = 0;
    let newBingoTiles = [];

    for (let row = 0; row < 3; row++) {
      if (tiles[row].every(clicked => clicked)) {
        bingoCount++;
        newBingoTiles.push(`Row ${row + 1}`);
      }
    }

    for (let col = 0; col < 3; col++) {
      if (tiles.every(row => row[col])) {
        bingoCount++;
        newBingoTiles.push(`Column ${col + 1}`);
      }
    }

    const mainDiagonal = tiles[0][0] && tiles[1][1] && tiles[2][2];
    const antiDiagonal = tiles[0][2] && tiles[1][1] && tiles[2][0];
    if (mainDiagonal) {
      bingoCount++;
      newBingoTiles.push("Main Diagonal");
    }
    if (antiDiagonal) {
      bingoCount++;
      newBingoTiles.push("Anti-Diagonal");
    }

    return { newBingoCount: bingoCount, newBingoTiles };
  };

  const resetGame = () => {
    const newBingoCard = generateBingoCard();
    setBingoCard(newBingoCard);
    setClickedTiles(Array(3).fill(null).map(() => Array(3).fill(false)));
    setBingoCount(0);
    setBingoTiles([]);
    setGameOver(false);
    setIsModalOpen(false);  // Close the BingoMessage modal
    setIsFreeModalOpen(false);
    setBlackout(false); // Reset blackout state

    // Clear localStorage when resetting the game
    localStorage.removeItem("bingoCard");
    localStorage.removeItem("clickedTiles");
    localStorage.removeItem("bingoCount");
    localStorage.removeItem("bingoTiles");
  };

  // Clear localStorage only when the user manually refreshes the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("bingoCard");
      localStorage.removeItem("clickedTiles");
      localStorage.removeItem("bingoCount");
      localStorage.removeItem("bingoTiles");
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!gameOver) {
      const savedBingoCard = localStorage.getItem("bingoCard");
      const savedClickedTiles = localStorage.getItem("clickedTiles");
      const savedBingoCount = localStorage.getItem("bingoCount");
      const savedBingoTiles = localStorage.getItem("bingoTiles");

      if (savedBingoCard && savedClickedTiles && savedBingoCount && savedBingoTiles) {
        setBingoCard(JSON.parse(savedBingoCard));
        setClickedTiles(JSON.parse(savedClickedTiles));
        setBingoCount(Number(savedBingoCount));
        setBingoTiles(JSON.parse(savedBingoTiles));
      }
    }
  }, [gameOver]);

  return (
    <div className={`bingo container ${isModalOpen || isFreeModalOpen ? 'blur' : ''}`}>
      <HeaderImg />
      <div className="line top-line"></div>
      <BingoIcon />
      <div className="intro">
        <p>Network with people around you to find the folks in the square. To win, complete a three in a row horizontal, vertical, or diagonal.</p>
        <h3>Good Luck!</h3>
      </div>
      <div className="bingo-grid">
        {bingoCard.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            const { firstName, lastName, company, position } = names[rowIndex * 3 + colIndex];
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`bingo-tile ${clickedTiles[rowIndex][colIndex] ? 'clicked' : ''}`}
                onClick={() => handleTileClick(rowIndex, colIndex)}
              >
                <div>
                  {clickedTiles[rowIndex][colIndex] ? (
                    ''
                  ) : (
                    <>
                      <div>{firstName}</div>
                      {lastName && <div>{lastName}</div>}
                      <div>{company}</div>
                      {position && <div>{position}</div>}
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {gameOver && !blackout && <p>Game Over! You completed a Bingo card.</p>}
      {blackout && <p>Game Over! You have achieved Blackout!</p>}
      <GameEnds />
      <div className="line"></div>
      <Sponsors />

      {isFreeModalOpen && <FreeModal isOpen={isFreeModalOpen} onClose={() => setIsFreeModalOpen(false)} />}
    </div>
  );
};

export default Bingo;
