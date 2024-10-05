import React, { useState, useEffect } from 'react';
import '../index.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import FreeModal from './free-modal';

// Generates a 3x3 bingo card with a Free space in the center
const generateBingoCard = () => {
  const card = Array.from({ length: 3 }, () => Array(3).fill(null));
  card[1][1] = "Free"; // Set the Free space in the middle
  return card;
};

const names = [
  { firstName: "Alice", lastName: "Smith", company: "Company A", position: "Manager" },
  { firstName: "Becky", lastName: "", company: "Company B", position: "Developer" },
  { firstName: "Charlie", lastName: "Brown", company: "Company C", position: "Designer" },
  { firstName: "David", lastName: "Johnson", company: "Company D", position: "Analyst" },
  { firstName: "Free", lastName: "", company: "", position: "" }, // Free space
  { firstName: "Frank", lastName: "Miller", company: "Company E", position: "Tester" },
  { firstName: "George", lastName: "Davis", company: "Company F", position: "HR" },
  { firstName: "Hannah", lastName: "Garcia", company: "Company G", position: "Sales" },
  { firstName: "Ivan", lastName: "Martinez", company: "Company H", position: "Support" }
];

const Bingo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [bingoCard, setBingoCard] = useState(() => {
    const savedBingoCard = localStorage.getItem("bingoCard");
    return savedBingoCard ? JSON.parse(savedBingoCard) : generateBingoCard();
  });

  const [clickedTiles, setClickedTiles] = useState(() => {
    const savedClickedTiles = localStorage.getItem("clickedTiles");
    return savedClickedTiles ? JSON.parse(savedClickedTiles) : Array(3).fill(null).map(() => Array(3).fill(false));
  });

  const [bingoCount, setBingoCount] = useState(0); // Track number of Bingos
  const [bingoTiles, setBingoTiles] = useState([]); // Track tiles involved in Bingo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFreeModalOpen, setIsFreeModalOpen] = useState(false);

  // Restore clickedTiles if state is passed from BingoMessage (after winning)
  useEffect(() => {
    if (location.state && location.state.clickedTiles) {
      setClickedTiles(location.state.clickedTiles);
    }
  }, [location.state]);

  const handleTileClick = (rowIndex, colIndex) => {
    if (clickedTiles[rowIndex][colIndex]) return; // Ignore clicks on already clicked tiles

    const newClickedTiles = clickedTiles.map((row, rldx) =>
      row.map((clicked, cldx) => (rldx === rowIndex && cldx === colIndex ? true : clicked))
    );
    setClickedTiles(newClickedTiles);

    if (rowIndex === 1 && colIndex === 1) {
      setIsFreeModalOpen(true); // Show the Free modal when Free space is clicked
    } else {
      const isCardFullyClicked = newClickedTiles.every(row => row.every(tile => tile === true));

      if (isCardFullyClicked) {
        // If the card is fully clicked (blackout), navigate to Winner page
        // Get the twitter handle from localStorage
        const twitterHandle = localStorage.getItem("twitterHandle");
        navigate('/winner', { state: { twitterHandle } });
      } else {
        // Check for new Bingos after every click
        const { newBingoCount, newBingoTiles } = findBingos(newClickedTiles);
        if (newBingoCount > bingoCount) {
          // If a new Bingo is found, update the count and display the Bingo message
          setBingoCount(newBingoCount);
          setBingoTiles(newBingoTiles);
          localStorage.setItem("clickedTiles", JSON.stringify(newClickedTiles));
          navigate('/bingo-message', { state: { clickedTiles: newClickedTiles, bingoTiles: newBingoTiles } });
        } else {
          // Save current state without Bingo
          localStorage.setItem("clickedTiles", JSON.stringify(newClickedTiles));
        }
      }
    }
  };

  // Find how many Bingos are there in the current clickedTiles
  const findBingos = (tiles) => {
    let bingoCount = 0;
    let newBingoTiles = [];

    const isRowBingo = (row) => {
      return tiles[row].every((clicked, colIdx) => clicked || tiles[row][colIdx] === "Free");
    };

    const isColumnBingo = (col) => {
      return tiles.every(row => row[col] || row[col] === "Free"); // Consider Free space
    };

    const isDiagonalBingo = () => {
      // Main diagonal (top-left to bottom-right)
      const mainDiagonal = tiles[0][0] && tiles[1][1] && tiles[2][2];
      // Anti-diagonal (top-right to bottom-left)
      const antiDiagonal = tiles[1][1] && tiles[2][0] && tiles[0][2];
      return mainDiagonal || antiDiagonal;
    };

    // Check rows for Bingo
    for (let row = 0; row < 3; row++) {
      if (isRowBingo(row)) {
        bingoCount += 1;
        newBingoTiles = newBingoTiles.concat(tiles[row].map((_, colIdx) => `Row ${row}, Col ${colIdx}`));
      }
    }

    // Check columns for Bingo
    for (let col = 0; col < 3; col++) {
      if (isColumnBingo(col)) {
        bingoCount += 1;
        newBingoTiles = newBingoTiles.concat(tiles.map((row, rowIdx) => `Row ${rowIdx}, Col ${col}`));
      }
    }

    // Check diagonals for Bingo
    if (isDiagonalBingo()) {
      bingoCount += 1;
      newBingoTiles = newBingoTiles.concat(["Main Diagonal", "Anti-Diagonal"]);
    }

    return { newBingoCount: bingoCount, newBingoTiles };
  };

  const resetGame = () => {
    const newBingoCard = generateBingoCard();
    setBingoCard(newBingoCard);
    setClickedTiles(Array(3).fill(null).map(() => Array(3).fill(false)));
    setBingoCount(0); // Reset bingo count
    setBingoTiles([]); // Reset bingo tiles
    setIsModalOpen(false);
    setIsFreeModalOpen(false);

    localStorage.removeItem("bingoCard");
    localStorage.removeItem("clickedTiles");
  };

  // Save bingoCard and clickedTiles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bingoCard", JSON.stringify(bingoCard));
    localStorage.setItem("clickedTiles", JSON.stringify(clickedTiles));
  }, [bingoCard, clickedTiles]);

  return (
    <div className={`bingo container ${isModalOpen || isFreeModalOpen ? 'blur' : ''}`}>
      <Link to="/" className="link">How to win?</Link>
      <h2>GoGopool and Uplink present</h2>
      <h1 className="bingo-title">Bingo</h1>
      <div className="intro">
        <p>Network with people around you to find the folks in the square. To win, complete a three in a row horizontal, vertical , or diagonal.</p>
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
      <p>Game ends at 7:30PM</p>
      <button className="reset-button" onClick={resetGame}>Start New Game</button>
      <FreeModal isOpen={isFreeModalOpen} onClose={() => setIsFreeModalOpen(false)} />
    </div>
  );
};

export default Bingo;

