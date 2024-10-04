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

  // Retrieve bingoCard and clickedTiles from localStorage, or generate new ones if not present
  const [bingoCard, setBingoCard] = useState(() => {
    const savedBingoCard = localStorage.getItem("bingoCard");
    return savedBingoCard ? JSON.parse(savedBingoCard) : generateBingoCard();
  });

  const [clickedTiles, setClickedTiles] = useState(() => {
    const savedClickedTiles = localStorage.getItem("clickedTiles");
    return savedClickedTiles ? JSON.parse(savedClickedTiles) : Array(3).fill(null).map(() => Array(3).fill(false));
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFreeModalOpen, setIsFreeModalOpen] = useState(false);

  // Restore clickedTiles if state is passed from BingoMessage (after winning)
  useEffect(() => {
    if (location.state && location.state.clickedTiles) {
      setClickedTiles(location.state.clickedTiles);
    }
  }, [location.state]);


  const handleTileClick = (rowIndex, colIndex) => {
    // Update the clickedTiles state with the new tile click
    const newClickedTiles = clickedTiles.map((row, rldx) =>
      row.map((clicked, cldx) => (rldx === rowIndex && cldx === colIndex ? !clicked : clicked))
    );
    setClickedTiles(newClickedTiles);
  
    // Check if the Free space is clicked, if yes, show Free Modal
    if (rowIndex === 1 && colIndex === 1) {
      setIsFreeModalOpen(true);
    } else {
      // Check if the entire card is fully clicked (blackout condition)
      const isCardFullyClicked = newClickedTiles.every(row => row.every(tile => tile === true));
  
      if (isCardFullyClicked) {
        // Navigate to Winning Page when the card is fully clicked (blackout)
        navigate('/winner', { state: { clickedTiles: newClickedTiles } });
      } else {
        // Check for a Bingo in any row, column, or diagonal
        if (checkBingo(newClickedTiles)) {
          // If there's a Bingo, save the clickedTiles to localStorage and navigate to Bingo Message
          localStorage.setItem("clickedTiles", JSON.stringify(newClickedTiles));
          navigate('/bingo-message', { state: { clickedTiles: newClickedTiles } });
        } else {
          // If no Bingo and not a blackout, just save the current clickedTiles to localStorage
          localStorage.setItem("clickedTiles", JSON.stringify(newClickedTiles));
        }
      }
    }
  };
  
  
  // Updated checkBingo function to prevent "L" shape from being a valid bingo
  const checkBingo = (tiles) => {
    const isRowBingo = (row) => tiles[row].every((clicked) => clicked); // Check if entire row is clicked
    const isColumnBingo = (col) => tiles.every((row) => row[col]); // Check if entire column is clicked
    const isDiagonalBingo = () => {
      // Main diagonal (top-left to bottom-right)
      const mainDiagonal = tiles[0][0] && tiles[1][1] && tiles[2][2];
      // Anti-diagonal (top-right to bottom-left)
      const antiDiagonal = tiles[0][2] && tiles[1][1] && tiles[2][0];
      return mainDiagonal || antiDiagonal;
    };

    // Check if any row is completely clicked
    for (let row = 0; row < 3; row++) {
      if (isRowBingo(row)) {
        return true; // Row bingo found
      }
    }

    // Check if any column is completely clicked
    for (let col = 0; col < 3; col++) {
      if (isColumnBingo(col)) {
        return true; // Column bingo found
      }
    }

    // Check diagonals
    if (isDiagonalBingo()) {
      return true; // Diagonal bingo found
    }

    return false; // No bingo found
  };

  const resetGame = () => {
    const newBingoCard = generateBingoCard();
    setBingoCard(newBingoCard);
    setClickedTiles(Array(3).fill(null).map(() => Array(3).fill(false)));
    setIsModalOpen(false);
    setIsFreeModalOpen(false);

    // Clear game state from localStorage
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
      <Link to="/" className="link">
        How to win?
      </Link>
      <h2>GoGopool and Uplink present</h2>
      <h1 className="bingo-title">Bingo</h1>
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
                    '' // Render nothing if clicked
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

      <button className="reset-button" onClick={resetGame}>
        Start New Game
      </button>

      <FreeModal isOpen={isFreeModalOpen} onClose={() => setIsFreeModalOpen(false)} />
    </div>
  );
};

export default Bingo;
