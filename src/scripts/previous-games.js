import rockImg from "../assets/rock.svg";
import paperImg from "../assets/paper.svg";
import scissorsImg from "../assets/scissors.svg";
import { getGameHistory, clearGameHistory } from "./data-store";

const handImages = {
  rock: rockImg,
  paper: paperImg,
  scissors: scissorsImg,
};

const populatePreviousGames = () => {
  const gameHistory = getGameHistory().reverse() || [];
  const gamesList = document.querySelector(".games-list");
  const clearHistoryButton = document.querySelector(
    '[data-action="clearHistory"]',
  );

  // Only show clear history button if there is history
  if (gameHistory.length > 0) {
    clearHistoryButton.style.display = "block";
  } else {
    clearHistoryButton.style.display = "none";
  }

  // Clear previous games
  gamesList.innerHTML = "";

  // Generate DOM elements for each game
  gameHistory.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.className = "game-card";

    const resultHands = document.createElement("div");
    resultHands.className = "result-hands";

    const left = document.createElement("div");
    left.className = "left";

    const right = document.createElement("div");
    right.className = "right";

    const leftImg = document.createElement("img");
    leftImg.src = handImages[game.hand1];
    leftImg.alt = game.hand1;

    const rightImg = document.createElement("img");
    rightImg.src = handImages[game.hand2];
    rightImg.alt = game.hand2;

    const resultText = document.createElement("div");
    resultText.className = "result-text";

    const leftResult = document.createElement("span");
    const rightResult = document.createElement("span");

    if (game.gameResult === "left") {
      leftResult.className = "result winner";
      rightResult.className = "result loser";
    } else if (game.gameResult === "right") {
      leftResult.className = "result loser";
      rightResult.className = "result winner";
    } else {
      leftResult.className = "result";
      rightResult.className = "result";
    }

    if (game.type === "pvc") {
      leftResult.textContent = "Player";
      rightResult.textContent = "Computer";
    } else {
      leftResult.textContent = "R2D2";
      rightResult.textContent = "C3PO";
    }

    left.appendChild(leftImg);
    right.appendChild(rightImg);
    resultHands.appendChild(left);
    resultHands.appendChild(right);
    resultText.appendChild(leftResult);
    resultText.appendChild(rightResult);

    gameCard.appendChild(resultHands);
    gameCard.appendChild(resultText);
    gamesList.appendChild(gameCard);
  });
};

const initializePreviousGames = () => {
  const clearHistoryButton = document.querySelector(
    '[data-action="clearHistory"]',
  );

  // Clear game history
  if (clearHistoryButton) {
    clearHistoryButton.addEventListener("click", () => {
      clearGameHistory();
      populatePreviousGames();
    });
  }
};

export { populatePreviousGames, initializePreviousGames };
