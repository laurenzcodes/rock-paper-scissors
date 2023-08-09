const uiScript = () => {
  const newGameMenu = document.querySelector(".new-game .menu-options");
  const gameMenu = document.querySelector(".rps .rps-menu");

  if (newGameMenu) {
    newGameMenu.addEventListener("click", (event) => {
      const target = event.target;

      if (target.tagName.toLowerCase() === "li") {
        const action = target.getAttribute("data-action");

        if (action === "pvc" || action === "cvc") {
          startGame(action);
        }
      }
    });
  }

  if (gameMenu) {
    gameMenu.addEventListener("click", (event) => {
      const target = event.target;

      if (target.tagName.toLowerCase() === "li") {
        const action = target.getAttribute("data-action");

        if (action === "menu") {
          // Hide the game and show the main menu
          document.querySelector(".main-menu").style.display = "flex";
          document.querySelector(".game").style.display = "none";
        } else if (action === "playAgain") {
          // Reinitiate the game logic for playing again (placeholder)
        }
      }
    });
  }
};

const startGame = (mode) => {
  // Hide the main menu and show the game view
  document.querySelector(".main-menu").style.display = "none";
  document.querySelector(".game").style.display = "block";

  // Set game type
  document.querySelector(".rps .game-type").innerText =
    mode === "pvc" ? "Player vs Computer" : "Computer vs Computer";

  if (mode === "pvc") {
    document.querySelector(".rps .hand-picker").style.display = "block";
    document.querySelector(".rps .rps-gameplay").style.display = "none";
  } else {
    document.querySelector(".rps .hand-picker").style.display = "none";
    document.querySelector(".rps .rps-gameplay").style.display = "grid";
  }
  // Show or hide the hand-picker based on the selected mode
  document.querySelector(".rps .hand-picker").style.display =
    mode === "pvc" ? "block" : "none";
};

export default uiScript;
