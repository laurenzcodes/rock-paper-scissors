const initialStore = {
  leftHand: null,
  rightHand: null,
  currentMode: null,
  gameHistory: [],
};

// Initial setup of local storage if it doesn't exist
const initializeLocalStorage = () => {
  if (!localStorage.getItem("gameState")) {
    localStorage.setItem("gameState", JSON.stringify(initialStore));
  }
};

// Helper functions
const updateGameState = (gameState) =>
  localStorage.setItem("gameState", JSON.stringify(gameState));
const getGameState = () => JSON.parse(localStorage.getItem("gameState"));

// Store the game mode (pvc or cvc)
const setCurrentMode = (mode) => {
  const gameState = getGameState();
  gameState.currentMode = mode;
  updateGameState(gameState);
};

// Get the game mode (pvc or cvc)
const getCurrentMode = () => {
  const gameState = getGameState();
  return gameState.currentMode;
};

// Store the player's picked hand
const setLefthand = (hand) => {
  const gameState = getGameState();
  gameState.leftHand = hand;
  updateGameState(gameState);
};

// Store the opponent's picked hand
const setRighthand = (hand) => {
  const gameState = getGameState();
  gameState.rightHand = hand;
  updateGameState(gameState);
};

// Get the player's picked hand
const getLeftHand = () => {
  const gameState = getGameState();
  return gameState.leftHand;
};

// Get the opponent's picked hand
const getRightHand = () => {
  const gameState = getGameState();
  return gameState.rightHand;
};

// Add a detailed result to the game history
const addGameResult = (type, hand1, hand2, gameResult) => {
  const gameState = getGameState();
  gameState.gameHistory.push({
    type, // "pvc" or "cvc"
    hand1, // e.g., "rock"
    hand2, // e.g., "scissors"
    gameResult, // left, right, or draw
  });
  localStorage.setItem("gameState", JSON.stringify(gameState));
};

// Retrieve the game history
const getGameHistory = () => {
  const gameState = getGameState();
  return gameState.gameHistory;
};

// Clear the game history
const clearGameHistory = () => {
  const gameState = getGameState();
  gameState.gameHistory = [];
  localStorage.setItem("gameState", JSON.stringify(gameState));
};

export {
  initializeLocalStorage,
  setLefthand,
  getLeftHand,
  setRighthand,
  getRightHand,
  addGameResult,
  getGameHistory,
  clearGameHistory,
  getCurrentMode,
  setCurrentMode,
  initialStore,
};
