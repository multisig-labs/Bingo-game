import { useContext, useEffect, useState } from "react";
import "../index.css";
import FreeModal from "./free-modal";
import { names } from "../utils/bingoUtils";
import { BingoContext } from "../BingoContext";

import Sponsors from "../assets/images/sponsors";
import HeaderImg from "../assets/images/header-img";
import BingoIcon from "../assets/images/bingo-logo";
import balloonRed from "../assets/images/balloon-red.svg";
import balloonPurple from "../assets/images/balloon-purple.svg";
import { useNavigate } from "react-router-dom";

const Bingo = () => {
  const [isFreeModalOpen, setIsFreeModalOpen] = useState(false);
  const [confirmCard, setConfirmCard] = useState(false);

  const { gameState, setGameState } = useContext(BingoContext);
  const navigate = useNavigate();

  const twitterHandle = localStorage.getItem("twitterHandle")
  const telegram = localStorage.getItem("telegram")
  useEffect(() => {
    // navigate to login if they land on this page without putting in twitterHandle or telegram
    if (!twitterHandle && !telegram) {
      navigate("/")
    }
  }, [twitterHandle, telegram, navigate])

  useEffect(() => {
    const isCardFullyClicked = gameState.bingoCard.every((row) =>
      row.every((tile) => tile === true))

    if (isCardFullyClicked) {
      setConfirmCard(true)
    } else {
      setConfirmCard(false)
    }
  }, [gameState.bingoCard])

  const handleTileClick = (rowIndex, colIndex) => {
    gameState.bingoCard[rowIndex][colIndex] = !gameState.bingoCard[rowIndex][colIndex]
    const newBingoCard = [...gameState.bingoCard];

    gameState.bingoCard = newBingoCard
    setGameState({ ...gameState });

    if (rowIndex === 1 && colIndex === 1 && !gameState.freeOpened) {
      gameState.freeOpened = true
      setGameState({ ...gameState })
      setIsFreeModalOpen(true);
    }
  };

  function handleConfirm() {
    navigate("/winner");
  }

  function handleBack() {
    navigate("/game-directions")
  }

  return (
    <div
      className={`bingo container ${isFreeModalOpen ? "blur" : ""
        }`}
    >
      <HeaderImg />
      <div className="line top-line"></div>
      <BingoIcon />
      <div className="intro">
        <div className="back-box">
          <img className="arrow-back" src="/arrow-back.svg" alt="arrow-back" />
          <span onClick={handleBack}>Back to Directions</span>
        </div>
        <p>
          Network with people around you to find the folks in the square. To
          win, complete a full card bingo -- all 9 squares --
        </p>
        <h3 className="uppercase">Good Luck!</h3>
      </div>
      <div className="bingo-grid">
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
                        <span>{firstName}</span>
                        {lastName && (
                          <span>{lastName}</span>
                        )}
                      </div>
                      <div>
                        <div className="position">
                          {position && <span>{position}</span>}
                        </div>
                        <div className="company">
                          {company && <span>{company}</span>}
                        </div>
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
      {confirmCard && (
        <div className="confirm">
          <span>You did it! Please take this card to Breevie to confirm your bingo!</span>
          <button onClick={handleConfirm} className="confirm-button">Confirm</button>
        </div>
      )}

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
