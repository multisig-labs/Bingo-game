import React, { useState } from 'react';
import './bingo.css';

// Function to generate the bingo card
const generateBingoCard = () => {
  const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
  const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);

  // Create a card with unique numbers first
  const card = Array.from({ length: 3 }, (_, rowIndex) =>
    shuffledNumbers.slice(rowIndex * 3, rowIndex * 3 + 3)
  );

  // Set the middle tile as "Free"
  card[1][1] = "Free";

  // Randomly choose a winning combination (row, column, or diagonal)
  const winningCombinationType = Math.floor(Math.random() * 3); // 0 for row, 1 for column, 2 for diagonal

  if (winningCombinationType === 0) {
    // Winning row
    const winningRowIndex = Math.floor(Math.random() * 3);
    card[winningRowIndex] = Array(3).fill(card[winningRowIndex][0]); // Fill row with the same number
  } else if (winningCombinationType === 1) {
    // Winning column
    const winningColIndex = Math.floor(Math.random() * 3);
    const winningNumber = card[0][winningColIndex]; // Use the number from the first row
    card[0][winningColIndex] = winningNumber;
    card[1][winningColIndex] = winningNumber;
    card[2][winningColIndex] = winningNumber; // Fill column with the same number
  } else {
    // Winning diagonal
    const winningNumber = card[0][0]; // Use the number from the top-left corner
    card[0][0] = winningNumber;
    card[1][1] = winningNumber; // The Free space already counts as wildcard
    card[2][2] = winningNumber; // Fill main diagonal
  }

  return card;
};

const Bingo = () => {
  const [bingoCard, setBingoCard] = useState(generateBingoCard());
  const [clickedTiles, setClickedTiles] = useState(
    Array(3).fill(null).map(() => Array(3).fill(false))
  );

  const handleTileClick = (rowIndex, colIndex) => {
    const newClickedTiles = clickedTiles.map((row, rldx) =>
      row.map((clicked, cldx) => (rldx === rowIndex && cldx === colIndex ? !clicked : clicked))
    );
    setClickedTiles(newClickedTiles);
  };

  const isBingo = () => {
    const checkBingo = (numbers, clicked) => {
      const clickedNumbers = numbers.map((num, index) => {
        return clicked[index] || num === "Free" ? num : null;
      }).filter(num => num !== null);

      // Check if there are exactly 3 clicked tiles
      return clickedNumbers.length === 3 && new Set(clickedNumbers).size === 1;
    };

    // Check rows for Bingo
    const rowBingo = clickedTiles.some((row, rowIndex) => checkBingo(bingoCard[rowIndex], row));

    // Check columns for Bingo
    const columnBingo = Array.from({ length: 3 }).some((_, colIndex) => {
      const column = bingoCard.map(row => row[colIndex]);
      const clickedColumn = clickedTiles.map(row => row[colIndex]);
      return checkBingo(column, clickedColumn);
    });

    // Check diagonals for Bingo
    const mainDiagonalBingo = checkBingo(
      bingoCard.map((_, index) => bingoCard[index][index]),
      clickedTiles.map((_, index) => clickedTiles[index][index])
    );

    const antiDiagonalBingo = checkBingo(
      bingoCard.map((_, index) => bingoCard[index][2 - index]),
      clickedTiles.map((_, index) => clickedTiles[index][2 - index])
    );

    return rowBingo || columnBingo || mainDiagonalBingo || antiDiagonalBingo;
  };

  const resetGame = () => {
    const newBingoCard = generateBingoCard();
    setBingoCard(newBingoCard);
    setClickedTiles(Array(3).fill(null).map(() => Array(3).fill(false)));
  };

  return (
    <div className="bingo-container">
      <h1 className="bingo-title">Bingo</h1>
      <div className="bingo-grid">
        {bingoCard.map((row, rowIndex) =>
          row.map((number, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`bingo-tile ${clickedTiles[rowIndex][colIndex] ? 'clicked' : ''} ${number === "Free" ? 'free-tile' : ''}`}
              onClick={() => handleTileClick(rowIndex, colIndex)}
            >
              {number === "Free" ? 'Free' : (clickedTiles[rowIndex][colIndex] ? number : '')}
            </div>
          ))
        )}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Start New Game
      </button>
      {isBingo() && <h2 className="bingo-alert">Bingo! Go Find Breevee!</h2>}
    </div>
  );
};

export default Bingo;
