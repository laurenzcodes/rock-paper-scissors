import uiLogic from "./scripts/ui-logic";
import { initializeLocalStorage } from "./scripts/data-store";

// Initialize the local storage for the game state
initializeLocalStorage();

// Start the UI script for the application
uiLogic();
