import { createContext, useState } from "react";
import { generateBingoCard } from "./components/bingoUtils";

export const BingoContext = createContext();

const defaultGame = {
  bingoCard: generateBingoCard(),
  bingoCount: 0,
  gameOver: false,
  freeOpened: false,
};

export const BingoProvider = ({ children }) => {
  const [gameState, setGameState] = useState(defaultGame);

  function resetGame() {
    setGameState(defaultGame)
  }

  return (
    <BingoContext.Provider value={{ gameState, setGameState, resetGame }}>
      {children}
    </BingoContext.Provider>
  );
};
