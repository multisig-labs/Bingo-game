import React, { useState } from 'react';

// Function to generate the bingo card
const generateBingoCard = () => {
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
  const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
  
  // Create a card with unique numbers first
  const card = Array.from({ length: 5 }, (_, rowIndex) =>
    shuffledNumbers.slice(rowIndex * 5, rowIndex * 5 + 5)
  );

  // Set middle tile as Free space
  card[2][2] = "Free"; // Middle tile is at position (2, 2)

  // Introduce a winning number
  const winningNumber = Math.floor(Math.random() * 25) + 1;

  // Randomly choose a row to fill with the winning number
  const winningRow = Math.floor(Math.random() * 5);
  card[winningRow] = Array(5).fill(winningNumber); // Fill entire row with the winning number

  return card;
};

const Bingo = () => {
  const [bingoCard, setBingoCard] = useState(generateBingoCard());
  const [clickedTiles, setClickedTiles] = useState(
    Array(5).fill(null).map(() => Array(5).fill(false))
  );

  const handleTileClick = (rowIndex, colIndex) => {
    const newClickedTiles = clickedTiles.map((row, rldx) =>
      row.map((clicked, cldx) => (rldx === rowIndex && cldx === colIndex ? !clicked : clicked))
    );
    setClickedTiles(newClickedTiles);
  };

  // Updated isBingo function
  const isBingo = () => {
    const checkBingo = (numbers, clicked) => {
      const clickedNumbers = numbers.map((num, index) => (clicked[index] ? num : null)).filter(num => num !== null);
      const uniqueClickedNumbers = [...new Set(clickedNumbers)];
      return uniqueClickedNumbers.length === 1 && clickedNumbers.length === 5; // Check if there are 5 clicked tiles of the same number
    };

    // Check rows
    const rowBingo = clickedTiles.some((row, rowIndex) => {
      return checkBingo(bingoCard[rowIndex], row);
    });

    // Check columns
    const columnBingo = Array.from({ length: 5 }).some((_, colIndex) => {
      const column = bingoCard.map((row) => row[colIndex]);
      const clickedColumn = clickedTiles.map((row) => row[colIndex]);
      return checkBingo(column, clickedColumn);
    });

    // Check main diagonal
    const mainDiagonalBingo = checkBingo(
      bingoCard.map((_, index) => bingoCard[index][index]),
      clickedTiles.map((_, index) => clickedTiles[index][index])
    );

    // Check anti-diagonal
    const antiDiagonalBingo = checkBingo(
      bingoCard.map((_, index) => bingoCard[index][4 - index]),
      clickedTiles.map((_, index) => clickedTiles[index][4 - index])
    );

    return rowBingo || columnBingo || mainDiagonalBingo || antiDiagonalBingo;
  };

  // Reset game
  const resetGame = () => {
    const newBingoCard = generateBingoCard();
    setBingoCard(newBingoCard);
    setClickedTiles(Array(5).fill(null).map(() => Array(5).fill(false)));
  };

  return (
    <div>
      <h1>Bingo</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 100px)', gap: '10px' }}>
        {bingoCard.map((row, rowIndex) =>
          row.map((number, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleTileClick(rowIndex, colIndex)}
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: clickedTiles[rowIndex][colIndex] ? 'blue' : 'lightgray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                border: '1px solid #000',
                fontSize: '24px'
              }}
            >
              {clickedTiles[rowIndex][colIndex] ? (number === "Free" ? "Free" : number) : ''}
            </div>
          ))
        )}
      </div>

      <button onClick={resetGame} style={{ marginTop: '20px' }}>
        Start New Game
      </button>
      {isBingo() && <h2 style={{ color: 'green' }}>Bingo!</h2>}
    </div>
  );
};

export default Bingo;

