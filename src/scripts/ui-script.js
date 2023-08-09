const uiScript = () => {
  const newGameMenu = document.querySelector(".new-game .menu-options");

  if (newGameMenu) {
    newGameMenu.addEventListener("click", (event) => {
      const target = event.target;

      if (target.tagName.toLowerCase() === "li") {
        // Retrieve the action from the data-action attribute
        const action = target.getAttribute("data-action");

        if (action === "pvc") {
          startGame("pvc");
        } else if (action === "cvc") {
          startGame("cvc");
        }
      }
    });
  }
};

// Function to start the game
const startGame = (mode) => {
  // Logic to start the game based on the selected mode (pvc or cvc)
  // You can manipulate the DOM here to change the UI as needed
  console.log(mode);
};

export default uiScript;
