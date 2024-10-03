import React, { useState } from 'react';
import '../index.css';
import Modal from './bingo-alert';


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
  { firstName: "Free", lastName: "", company: "", position: "" }, // Free space
  { firstName: "Frank", lastName: "Miller", company: "Company E", position: "Tester" },
  { firstName: "George", lastName: "Davis", company: "Company F", position: "HR" },
  { firstName: "Hannah", lastName: "Garcia", company: "Company G", position: "Sales" },
  { firstName: "Ivan", lastName: "Martinez", company: "Company H", position: "Support" }
];

const Bingo = () => {
  const [bingoCard, setBingoCard] = useState(generateBingoCard());
  const [clickedTiles, setClickedTiles] = useState(Array(3).fill(null).map(() => Array(3).fill(false)));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTileClick = (rowIndex, colIndex) => {
    const newClickedTiles = clickedTiles.map((row, rldx) =>
      row.map((clicked, cldx) => (rldx === rowIndex && cldx === colIndex ? !clicked : clicked))
    );
    setClickedTiles(newClickedTiles);
    checkBingo(newClickedTiles);
  };

  const checkBingo = (tiles) => {
    const clickedCount = tiles.flat().filter(Boolean).length; 
    if (clickedCount >= 3) {
      setIsModalOpen(true);
    }
  };

  const resetGame = () => {
    const newBingoCard = generateBingoCard();
    setBingoCard(newBingoCard);
    setClickedTiles(Array(3).fill(null).map(() => Array(3).fill(false)));
    setIsModalOpen(false);
  };

  return (
    <div className="bingo container">
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

      <button className="reset-button" onClick={resetGame}>
        Start New Game
      </button>
      
      <Modal isOpen={isModalOpen} onClose={resetGame}/>
    </div>
  );
};

export default Bingo;
