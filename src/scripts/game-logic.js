import {
  setLefthand,
  setRighthand,
  getLeftHand,
  getRightHand,
  setCurrentMode,
} from "./data-store";

const countdownElement = document.querySelector(".rps-status .countdown");
const resultText = document.querySelector(".rps-status .result");

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

const startRps = (mode) => {
  let countdown = 3;

  const countdownInterval = setInterval(() => {
    // Update the countdown display
    countdownElement.textContent = countdown;

    if (countdown <= 0) {
      // Clear the interval when countdown reaches 0
      clearInterval(countdownInterval);
      countdownElement.style.display = "none";

      // Randomly select a hand for the opponent
      const rightHand = getRandomHand();
      setRighthand(rightHand);

      // If in cvc mode, randomly select a hand for the player (also a computer in this case) as well
      if (mode === "cvc") {
        const leftHand = getRandomHand();
        setLefthand(leftHand);
      }

      const gameResult = computeWinner(getLeftHand(), getRightHand());
      setResultText(gameResult, mode);

      // Display "Play again" button
      const playAgainButton = document.querySelector(
        ".rps-menu .rps-play-again",
      );
      playAgainButton.style.display = "list-item";
    }

    countdown--;
  }, 1000); // 1-second interval
};

const initializeGame = (mode) => {
  if (mode === "pvc") {
    // Display the hand picker and store the picked hand in the local storage
    const handPicker = document.querySelector(".hand-picker .hands");

    handPicker.addEventListener("click", (event) => {
      const target = event.target;

      if (
        target.tagName.toLowerCase() === "img" &&
        target.hasAttribute("data-hand")
      ) {
        // Retrieve the hand type from the data-hand attribute
        const hand = target.getAttribute("data-hand");

        // Store the picked hand in the local storage for later use
        setLefthand(hand);
        document.querySelector(".hand-picker").style.display = "none";
        document.querySelector(".rps-gameplay").style.display = "grid";
        startRps(mode);
      }
    });
  } else if (mode === "cvc") {
    // If we are in cvc mode, we can just start the game right away
    startRps(mode);
  }
};

const handleRestart = (mode) => {
  // Reset the picked hands
  setLefthand(null);
  setRighthand(null);
  if (mode === "pvc") {
    // Display the hand picker and hide the gameplay if we are in pvc mode
    document.querySelector(".hand-picker").style.display = "grid";
    document.querySelector(".rps-gameplay").style.display = "none";
  }
  // Reset game elements
  document.querySelector(".rps-menu .rps-play-again").style.display = "none";
  countdownElement.style.display = "block";
  countdownElement.textContent = "3";
  resultText.style.display = "none";
  // Reinitialize the game
  initializeGame(mode);
};

const handleMainMenu = () => {
  // Reset game state
  setLefthand(null);
  setRighthand(null);
  setCurrentMode(null);
  // Reset game elements
  countdownElement.style.display = "block";
  countdownElement.textContent = "3";
  resultText.style.display = "none";
};

const computeWinner = (leftHand, rightHand) => {
  if (leftHand === rightHand) {
    return "draw";
  } else if (
    (leftHand === "rock" && rightHand === "scissors") ||
    (leftHand === "paper" && rightHand === "rock") ||
    (leftHand === "scissors" && rightHand === "paper")
  ) {
    return "left";
  } else {
    return "right";
  }
};

export { initializeGame, handleRestart, handleMainMenu, computeWinner };
