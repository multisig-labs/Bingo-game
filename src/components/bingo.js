import React, { useState } from 'react';
import './bingo.css';

// Function to generate the bingo card
const generateBingoCard = () => {
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
  const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);

  const card = Array.from({length: 5}, (_,rowIndex)=> (
    shuffledNumbers.slice(rowIndex * 5, rowIndex * 5 + 5)
  ));

  const winningNumber = Math.floor(Math.random() * 25) +1;
  const winningRow = Math.floor(Math.random() *5);
  card[winningRow] = Array(5).fill(winningNumber);

  return card;
  
 
};

const generateWinningNumbers = (bingoCard) => {
  const flatCard = bingoCard.flat();
  const shuffledWinningNumbers = flatCard.sort(() => Math.random() - 0.5);
  return shuffledWinningNumbers.slice(0, 5);//Get random winning numbers. 
}

const Bingo = () => {
  const [bingoCard, setBingoCard] = useState(generateBingoCard());

  const [clickedTiles, setClickedTiles] = useState(Array(5).fill(null).map(() => Array(5).fill(false)));

  const [winningNumbers, setWinningNumbers] = useState(generateWinningNumbers(bingoCard))

  const handleTileClick = (rowIndex, colIndex) => {
    const newClickedTiles = clickedTiles.map((row, rldx) =>
      row.map((clicked, cldx) => (rldx === rowIndex && cldx === colIndex ? !clicked : clicked))
    );
    setClickedTiles(newClickedTiles);
  };

  const isBingo = () => {
   const checkBingo = (tiles) => {

    const firstNumber = tiles[0];
    return tiles.every((num) => num === firstNumber && num !== undefined);
   };

   const rowBingo = clickedTiles.some((_, rowIndex) => {
    const numbersInRow = bingoCard[rowIndex].filter((_,colIndex) => clickedTiles[rowIndex][colIndex]);
    
    return numbersInRow.length === 5 && checkBingo(numbersInRow);

   });

   const columnBingo = Array.from({ length: 5}).some((_,colIndex) => {
    const numbersInColumn = clickedTiles.map((row, rowIndex) => 
      clickedTiles[rowIndex][colIndex] ? bingoCard[rowIndex][colIndex] : undefined
    );
    return numbersInColumn.length === 5 && checkBingo(numbersInColumn);
   });

   const mainDiagonalBingo = clickedTiles.every((_, index) => {
    return clickedTiles[index][index] && bingoCard[index][index];
   }) && checkBingo(clickedTiles.map((_, index) => bingoCard[index][index]));

   const antiDiagonalBingo = clickedTiles.every((_,index) => {
    return clickedTiles[index][4 - index] && bingoCard[index][4 - index];
   }) && checkBingo(clickedTiles.map((_, index) => bingoCard[index][4 - index]));

   return rowBingo || columnBingo || mainDiagonalBingo || antiDiagonalBingo;
  };
  

  const resetGame = () => {
    const newBingoCard = generateBingoCard ();
    setBingoCard(newBingoCard);
    setWinningNumbers(generateWinningNumbers(newBingoCard));
    setClickedTiles(Array(5).fill(null).map(() => Array(5).fill(false)));
  };

  return (
    <div>
      <h1>Bingo Game</h1>
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
              {clickedTiles[rowIndex][colIndex] ? number : ''}
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

export default Bingo ;
