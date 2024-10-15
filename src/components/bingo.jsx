import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import FreeModal from "./free-modal";
import { findBingos, names } from "./bingoUtils";
import { BingoContext } from "../BingoContext";

import Sponsors from "../assets/images/sponsors";
import HeaderImg from "../assets/images/header-img";
import BingoIcon from "../assets/images/bingo-logo";
import balloonRed from "../assets/images/balloon-red.svg";
import balloonPurple from "../assets/images/balloon-purple.svg";

const Bingo = () => {
  const navigate = useNavigate();
  const [isFreeModalOpen, setIsFreeModalOpen] = useState(false);
  const { gameState, setGameState } = useContext(BingoContext);

  const twitterHandle = localStorage.getItem("twitterHandle");

  const handleTileClick = (rowIndex, colIndex) => {
    gameState.bingoCard[rowIndex][colIndex] = !gameState.bingoCard[rowIndex][colIndex]
    const newBingoCard = [...gameState.bingoCard];
    const { newBingoCount } = findBingos(newBingoCard);

    gameState.bingoCard = newBingoCard
    setGameState({ ...gameState });

    if (newBingoCount > gameState.bingoCount) {
      gameState.bingoCount = gameState.bingoCount + 1
      setGameState({ ...gameState });
      navigate("/bingo-message");
    }

    const isCardFullyClicked = newBingoCard.every((row) =>
      row.every((tile) => tile === true)
    );

    if (isCardFullyClicked) {
      // Game over when the card is filled
      // do whatever finish logic we want here
      gameState.gameOver = true;
      setGameState({ ...gameState })
      fetch(`/api/telegram/bingo?${twitterHandle}`);
    }
    if (rowIndex === 1 && colIndex === 1 && !gameState.freeOpened) {
      gameState.freeOpened = true
      setGameState({ ...gameState })
      setIsFreeModalOpen(true);
    }
  };


  return (
    <div
      className={`bingo container ${isFreeModalOpen ? "blur" : ""
        }`}
    >
      <HeaderImg />
      <div className="line top-line"></div>
      <BingoIcon />
      <div className="intro">
        <p>
          Network with people around you to find the folks in the square. To
          win, complete a three in a row horizontal, vertical, or diagonal.
        </p>
        <h3 className="uppercase">Good Luck!</h3>
      </div>
      <div className="bingo-grid ">
        {gameState.bingoCard.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            const { firstName, lastName, company, position, special } =
              names[rowIndex * 3 + colIndex];
            const isFreeTile = rowIndex === 1 && colIndex === 1; // Check if it's the Free tile
            const tileClass = special ? "special-tile" : "";
            const freeTileClass = isFreeTile ? "free-tile" : ""; // Add class if it's the Free tile

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`bingo-tile ${gameState.bingoCard[rowIndex][colIndex] ? "clicked" : ""
                  } ${tileClass} ${freeTileClass}`}
                onClick={() => handleTileClick(rowIndex, colIndex)}
              >
                <img
                  src={`${gameState.bingoCard[rowIndex][colIndex]
                    ? balloonPurple
                    : balloonRed
                    }`}
                  alt="balloon"
                  style={{ position: "absolute", top: "5px", right: "5px" }}
                />
                <div
                  className={`bingo-tile-content ${gameState.bingoCard[rowIndex][colIndex] ? "clicked" : ""
                    }`}
                >
                  {gameState.bingoCard[rowIndex][colIndex] ? (
                    <>
                      <div className="name">
                        <span className="first-name">{firstName}</span>
                        {lastName && (
                          <span className="last-name">{lastName}</span>
                        )}
                      </div>
                      <div className="position">
                        {position && <span>{position}</span>}
                      </div>
                      <div className="company">
                        {company && <span>{company}</span>}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="name">
                        <span className="first-name">{firstName}</span>
                        {lastName && (
                          <span className="last-name">{lastName}</span>
                        )}
                      </div>
                      <div className="position">
                        {position && <span>{position}</span>}
                      </div>
                      <div className="company">
                        {company && <span>{company}</span>}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="line"></div>
      <Sponsors />
      {isFreeModalOpen && (
        <FreeModal
          isOpen={isFreeModalOpen}
          onClose={() => setIsFreeModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Bingo;
