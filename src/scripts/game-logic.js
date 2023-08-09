import {
  setLefthand,
  setRighthand,
  getLeftHand,
  getRightHand,
  setCurrentMode,
  getCurrentMode,
  addGameResult,
} from "./data-store";

import rockImg from "../assets/rock.svg";
import paperImg from "../assets/paper.svg";
import scissorsImg from "../assets/scissors.svg";

// DOM elements
const countdownElement = document.querySelector(".rps-status .countdown");
const resultText = document.querySelector(".rps-status .result");
const leftHand = document.querySelector(".rps-gameplay .player.left");
const rightHand = document.querySelector(".rps-gameplay .player.right");
const leftHandImg = document.querySelector(".rps-gameplay .player.left img");
const rightHandImg = document.querySelector(".rps-gameplay .player.right img");
const handPicker = document.querySelector(".hand-picker .hands");

const computeWinner = (leftHand, rightHand) => {
  if (leftHand === rightHand) {
    return "draw";
  }

  if (
    (leftHand === "rock" && rightHand === "scissors") ||
    (leftHand === "paper" && rightHand === "rock") ||
    (leftHand === "scissors" && rightHand === "paper")
  ) {
    return "left";
  }

  return "right";
};

const getRandomHand = () => {
  const hands = ["rock", "paper", "scissors"];
  return hands[Math.floor(Math.random() * hands.length)];
};

const setResultText = (result, mode) => {
  if (mode === "pvc") {
    if (result === "draw") {
      resultText.textContent = "Draw!";
    } else if (result === "left") {
      resultText.textContent = "You win!";
    } else {
      resultText.textContent = "You lose!";
    }
  }

  if (mode === "cvc") {
    if (result === "draw") {
      resultText.textContent = "Draw!";
    } else if (result === "left") {
      resultText.textContent = "R2D2 wins!";
    } else {
      resultText.textContent = "C3PO wins!";
    }
  }
  resultText.style.display = "block";
};

const handImages = {
  rock: rockImg,
  paper: paperImg,
  scissors: scissorsImg,
};

const updateHandsRender = (leftHand, rightHand) => {
  leftHandImg.setAttribute("src", handImages[leftHand]);
  rightHandImg.setAttribute("src", handImages[rightHand]);
};

const updateHandsState = (result) => {
  switch (result) {
    case "left":
      leftHand.attributes["data-result"].value = "win";
      rightHand.attributes["data-result"].value = "lose";
      break;
    case "right":
      leftHand.attributes["data-result"].value = "lose";
      rightHand.attributes["data-result"].value = "win";
      break;
    case "draw":
      leftHand.attributes["data-result"].value = "draw";
      rightHand.attributes["data-result"].value = "draw";
      break;
    default:
      leftHand.attributes["data-result"].value = "pending";
      rightHand.attributes["data-result"].value = "pending";
      break;
  }
};

const updateCountdown = (countdown) => {
  countdownElement.textContent = countdown;
};

const handleCountdownEnd = (mode) => {
  countdownElement.style.display = "none";

  const rightHand = getRandomHand();
  setRighthand(rightHand);

  let leftHand;
  if (mode === "cvc") {
    leftHand = getRandomHand();
    setLefthand(leftHand);
  }

  const gameResult = computeWinner(getLeftHand(), getRightHand());
  setResultText(gameResult, mode);
  updateHandsRender(getLeftHand(), getRightHand());
  updateHandsState(gameResult);
  addGameResult(mode, getLeftHand(), getRightHand(), gameResult);

  document.querySelector(".rps-menu").style.display = "flex";
};

const startRps = (mode) => {
  let countdown = 3;

  const handElements = document.querySelectorAll(".rps-gameplay .player .hand");
  handElements.forEach((hand) => hand.classList.add("bobbing"));

  updateCountdown(countdown);

  const countdownInterval = setInterval(() => {
    // eslint-disable-next-line no-plusplus
    countdown--;

    updateCountdown(countdown);

    if (countdown < 1) {
      clearInterval(countdownInterval);
      handleCountdownEnd(mode);

      handElements.forEach((hand) => hand.classList.remove("bobbing"));
    }
  }, 1000);
};

handPicker.addEventListener("click", (event) => {
  // Check if the game is in pvc mode
  const mode = getCurrentMode(); // Assuming you have a function to get the current mode
  if (mode !== "pvc") return;

  const { target } = event;
  if (
    target.tagName.toLowerCase() === "img" &&
    target.hasAttribute("data-hand")
  ) {
    const hand = target.getAttribute("data-hand");
    setLefthand(hand);
    document.querySelector(".hand-picker").style.display = "none";
    document.querySelector(".rps-gameplay").style.display = "grid";
    startRps(mode);
  }
});

const initializeGame = (mode) => {
  if (mode === "pvc") {
    document.querySelector(".hand-picker").style.display = "grid";
    document.querySelector(".rps-gameplay").style.display = "none";
  } else if (mode === "cvc") {
    startRps(mode);
  }
};

const resetGameElements = () => {
  // Reset game state
  setLefthand(null);
  setRighthand(null);

  // Reset game elements
  document.querySelector(".rps-menu").style.display = "none";
  countdownElement.style.display = "block";
  countdownElement.textContent = "3";
  resultText.style.display = "none";
  leftHandImg.setAttribute("src", handImages.rock);
  rightHandImg.setAttribute("src", handImages.rock);
};

const handleRestart = (mode) => {
  resetGameElements();

  if (mode === "pvc") {
    // Display the hand picker and hide the gameplay if we are in pvc mode
    document.querySelector(".hand-picker").style.display = "grid";
    document.querySelector(".rps-gameplay").style.display = "none";
  }

  // Reinitialize the game
  initializeGame(mode);
};

const handleMainMenu = () => {
  resetGameElements();
  // Reset current mode
  setCurrentMode(null);
};

export { initializeGame, handleRestart, handleMainMenu, computeWinner };
