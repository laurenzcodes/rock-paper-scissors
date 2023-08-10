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
import { populatePreviousGames } from "./previous-games";

// DOM elements
const countdownElement = document.querySelector(".rps-status .countdown");
const resultText = document.querySelector(".rps-status .result");
const leftHand = document.querySelector(".rps-gameplay .player.left");
const rightHand = document.querySelector(".rps-gameplay .player.right");
const leftHandImg = document.querySelector(".rps-gameplay .player.left img");
const rightHandImg = document.querySelector(".rps-gameplay .player.right img");

const WINNING_COMBINATIONS = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const computeWinner = (leftHand, rightHand) => {
  if (leftHand === rightHand) return "draw";
  return WINNING_COMBINATIONS[leftHand] === rightHand ? "left" : "right";
};

const getResultText = (result, mode) => {
  const outcomes = {
    draw: "Draw!",
    left: mode === "pvc" ? "You win!" : "R2D2 wins!",
    right: mode === "pvc" ? "You lose!" : "C3PO wins!",
  };

  return outcomes[result];
};

// Hand related functions

const handImages = {
  rock: rockImg,
  paper: paperImg,
  scissors: scissorsImg,
};

const getRandomHand = () => {
  const hands = ["rock", "paper", "scissors"];
  return hands[Math.floor(Math.random() * hands.length)];
};

const updateHandsRender = (leftHand, rightHand) => {
  leftHandImg.setAttribute("src", handImages[leftHand]);
  leftHandImg.setAttribute("alt", leftHand);
  rightHandImg.setAttribute("src", handImages[rightHand]);
  rightHandImg.setAttribute("alt", rightHand);
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
  resultText.textContent = getResultText(gameResult, mode);
  resultText.style.display = "block";
  updateHandsRender(getLeftHand(), getRightHand());
  updateHandsState(gameResult);
  addGameResult(mode, getLeftHand(), getRightHand(), gameResult);

  document.querySelector(".rps-menu").style.display = "flex";
};

const startCountdown = (mode, onComplete) => {
  let countdown = 3;
  updateCountdown(countdown);

  const countdownInterval = setInterval(() => {
    // eslint-disable-next-line no-plusplus
    countdown--;
    updateCountdown(countdown);

    if (countdown < 1) {
      clearInterval(countdownInterval);
      onComplete(mode);
    }
  }, 1000);
};

const startRps = (mode) => {
  const handElements = document.querySelectorAll(".rps-gameplay .player .hand");
  handElements.forEach((hand) => hand.classList.add("bobbing"));

  startCountdown(mode, (endedMode) => {
    handleCountdownEnd(endedMode);
    handElements.forEach((hand) => hand.classList.remove("bobbing"));
  });
};

/**
 * Sets up the hand picker click events in player-vs-computer mode.
 */
const setupPvcHandSelection = () => {
  const handPicker = document.querySelector(".hand-picker .hands");

  // Exit if handPicker doesn't exist.
  if (!handPicker) return;

  handPicker.addEventListener("click", (event) => {
    // Handle selection only in player-vs-computer mode.
    if (getCurrentMode() !== "pvc") return;

    const isImageElement = event.target.tagName.toLowerCase() === "img";
    const hasHandData = event.target.hasAttribute("data-hand");

    if (isImageElement && hasHandData) {
      // Get and set chosen hand.
      const hand = event.target.getAttribute("data-hand");
      setLefthand(hand);

      // Transition to game play UI.
      document.querySelector(".hand-picker").style.display = "none";
      document.querySelector(".rps-gameplay").style.display = "grid";

      // Start the pvc game.
      startRps("pvc");
    }
  });
};

setupPvcHandSelection();

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
  populatePreviousGames();
};

export {
  initializeGame,
  handleRestart,
  handleMainMenu,
  computeWinner,
  getRandomHand,
  getResultText,
};
