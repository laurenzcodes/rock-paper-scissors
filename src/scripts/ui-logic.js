import { initializeGame, handleRestart, handleMainMenu } from "./game-logic";
import { getCurrentMode, setCurrentMode } from "./data-store";

const startGame = (mode) => {
  // Hide the main menu and show the game view
  document.querySelector(".main-menu").style.display = "none";
  document.querySelector(".game").style.display = "block";

  // Set game type title
  document.querySelector(".rps .game-type").innerText =
    mode === "pvc" ? "Player vs Computer" : "R2D2 vs C3PO";

  // Show the hand picker if the game is player vs computer
  if (mode === "pvc") {
    document.querySelector(".rps .hand-picker").style.display = "block";
    document.querySelector(".rps .rps-gameplay").style.display = "none";
  } else {
    document.querySelector(".rps .hand-picker").style.display = "none";
    document.querySelector(".rps .rps-gameplay").style.display = "grid";
  }

  // Initiate the game logic
  initializeGame(mode);
};

const uiLogic = () => {
  const newGameMenu = document.querySelector(".new-game .menu-options");
  const gameMenu = document.querySelector(".rps .rps-menu");

  if (newGameMenu) {
    newGameMenu.addEventListener("click", (event) => {
      const { target } = event;

      if (target.tagName.toLowerCase() === "li") {
        const action = target.getAttribute("data-action");

        if (action === "pvc" || action === "cvc") {
          setCurrentMode(action);
          startGame(action);
        }
      }
    });
  }

  if (gameMenu) {
    gameMenu.addEventListener("click", (event) => {
      const { target } = event;

      if (target.tagName.toLowerCase() === "li") {
        const action = target.getAttribute("data-action");

        if (action === "menu") {
          handleMainMenu();
          // Hide the game and show the main menu
          document.querySelector(".main-menu").style.display = "flex";
          document.querySelector(".game").style.display = "none";
        } else if (action === "playAgain") {
          const currentMode = getCurrentMode();
          handleRestart(currentMode);
        }
      }
    });
  }
};

export default uiLogic;
