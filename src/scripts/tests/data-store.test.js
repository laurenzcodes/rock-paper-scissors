import {
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
} from "../data-store";

const initialStore = JSON.stringify({
  leftHand: null,
  rightHand: null,
  currentMode: null,
  gameHistory: [],
});

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();

  let storedValue = initialStore;
  // Set up mocks for local storage
  Storage.prototype.getItem = jest.fn(() => storedValue);
  Storage.prototype.setItem = jest.fn((key, value) => {
    if (key === "gameState") {
      storedValue = value;
    }
  });

  initializeLocalStorage();
});

describe("initializeLocalStorage", () => {
  it("should initialize local storage with initial state if not already set", () => {
    Storage.prototype.getItem = jest.fn(() => null);
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    initializeLocalStorage();

    expect(setItemSpy).toHaveBeenCalledWith("gameState", initialStore);
  });
});

describe("Game Mode Management", () => {
  it("should set the current game mode", () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    setCurrentMode("pvc");
    expect(setItemSpy).toHaveBeenCalledWith(
      "gameState",
      JSON.stringify({
        ...JSON.parse(initialStore),
        currentMode: "pvc",
      }),
    );
  });

  it("should get the current game mode", () => {
    setCurrentMode("pvc");
    const currentMode = getCurrentMode();
    expect(currentMode).toBe("pvc");
  });
});

describe("Hand Management", () => {
  it("should set and get the left hand correctly", () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    setLefthand("rock");
    expect(setItemSpy).toHaveBeenCalledWith(
      "gameState",
      JSON.stringify({
        ...JSON.parse(initialStore),
        leftHand: "rock",
      }),
    );

    const leftHand = getLeftHand();
    expect(leftHand).toBe("rock");
  });

  it("should set and get the right hand correctly", () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    setRighthand("rock");
    expect(setItemSpy).toHaveBeenCalledWith(
      "gameState",
      JSON.stringify({
        ...JSON.parse(initialStore),
        rightHand: "rock",
      }),
    );

    const rightHand = getRightHand();
    expect(rightHand).toBe("rock");
  });
});

describe("Game History Management", () => {
  it("should add a game result to the game history", () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    addGameResult("pvc", "rock", "scissors", "left");
    expect(setItemSpy).toHaveBeenCalledWith(
      "gameState",
      JSON.stringify({
        ...JSON.parse(initialStore),
        gameHistory: [
          {
            type: "pvc",
            hand1: "rock",
            hand2: "scissors",
            gameResult: "left",
          },
        ],
      }),
    );
  });

  it("should get the game history", () => {
    addGameResult("pvc", "rock", "scissors", "left");
    const gameHistory = getGameHistory();
    expect(gameHistory).toEqual([
      {
        type: "pvc",
        hand1: "rock",
        hand2: "scissors",
        gameResult: "left",
      },
    ]);
  });

  it("should clear the game history", () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    addGameResult("pvc", "rock", "scissors", "left");
    clearGameHistory();
    expect(setItemSpy).toHaveBeenCalledWith(
      "gameState",
      JSON.stringify({
        ...JSON.parse(initialStore),
        gameHistory: [],
      }),
    );
  });
});
