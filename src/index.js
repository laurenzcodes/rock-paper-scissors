import uiLogic from "./scripts/ui-logic";
import { initializeLocalStorage } from "./scripts/data-store";
import {
  populatePreviousGames,
  initializePreviousGames,
} from "./scripts/previous-games";

// Initialize the local storage for the game state
initializeLocalStorage();

// Start the UI script for the application
uiLogic();
populatePreviousGames();
initializePreviousGames();
