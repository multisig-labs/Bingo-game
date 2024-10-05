import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import FreeModal from './free-modal';
import BingoMessage from './bingo-message'; 
import '../index.css';

const generateBingoCard = () => {
  const card = Array.from({ length: 3 }, () => Array(3).fill(null));
  card[1][1] = "Free"; 
  return card;
};

const names = [
  { firstName: "Alice", lastName: "Smith", company: "Company A", position: "Manager" },
  { firstName: "Becky", lastName: "", company: "Company B", position: "Developer" },
  { firstName: "Charlie", lastName: "Brown", company: "Company C", position: "Designer" },
  { firstName: "David", lastName: "Johnson", company: "Company D", position: "Analyst" },
  { firstName: "Free", lastName: "", company: "", position: "" },
  { firstName: "Frank", lastName: "Miller", company: "Company E", position: "Tester" },
  { firstName: "George", lastName: "Davis", company: "Company F", position: "HR" },
  { firstName: "Hannah", lastName: "Garcia", company: "Company G", position: "Sales" },
  { firstName: "Ivan", lastName: "Martinez", company: "Company H", position: "Support" }
];

const Bingo = () => {
  const navigate = useNavigate();  // Used for navigation
  const [bingoCard, setBingoCard] = useState(() => {
    const savedBingoCard = localStorage.getItem("bingoCard");
    return savedBingoCard ? JSON.parse(savedBingoCard) : generateBingoCard();
  });

  const [clickedTiles, setClickedTiles] = useState(() => {
    const savedClickedTiles = localStorage.getItem("clickedTiles");
    return savedClickedTiles ? JSON.parse(savedClickedTiles) : Array(3).fill(null).map(() => Array(3).fill(false));
  });

  const [bingoCount, setBingoCount] = useState(0);
  const [bingoTiles, setBingoTiles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [isFreeModalOpen, setIsFreeModalOpen] = useState(false);
  const [blackout, setBlackout] = useState(false); // New state for blackout

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
      setIsModalOpen(true);  // Open BingoMessage modal when Bingo is hit
    }

    // Check for blackout after each tile click
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

    localStorage.removeItem("bingoCard");
    localStorage.removeItem("clickedTiles");
  };

  useEffect(() => {
    localStorage.setItem("bingoCard", JSON.stringify(bingoCard));
    localStorage.setItem("clickedTiles", JSON.stringify(clickedTiles));
  }, [bingoCard, clickedTiles]);

  return (
    <div className={`bingo container ${isModalOpen || isFreeModalOpen ? 'blur' : ''}`}>
      <Link to="/game-directions" className="link">How to win?</Link>
      <h2>GoGopool and Uplink present</h2>
      <h1 className="bingo-title">Bingo</h1>
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
      <button className="reset-button" onClick={resetGame}>Start New Game</button>

      {isFreeModalOpen && <FreeModal isOpen={isFreeModalOpen} onClose={() => setIsFreeModalOpen(false)} />}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <BingoMessage close={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Bingo;



