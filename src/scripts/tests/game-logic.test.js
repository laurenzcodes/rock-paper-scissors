import { computeWinner, getRandomHand, getResultText } from "../game-logic";

jest.mock("../previous-games", () => ({
  populatePreviousGames: jest.fn(),
  // any other exports you want to mock
}));

describe("computeWinner", () => {
  it('should return "draw" when both hands are the same', () => {
    expect(computeWinner("rock", "rock")).toBe("draw");
    expect(computeWinner("paper", "paper")).toBe("draw");
    expect(computeWinner("scissors", "scissors")).toBe("draw");
  });

  it('should return "left" when left hand wins', () => {
    expect(computeWinner("rock", "scissors")).toBe("left");
    expect(computeWinner("paper", "rock")).toBe("left");
    expect(computeWinner("scissors", "paper")).toBe("left");
  });

  it('should return "right" when right hand wins', () => {
    expect(computeWinner("rock", "paper")).toBe("right");
    expect(computeWinner("paper", "scissors")).toBe("right");
    expect(computeWinner("scissors", "rock")).toBe("right");
  });
});

describe("getRandomHand", () => {
  // Store the original Math.random function
  const originalRandom = Math.random;

  afterEach(() => {
    // Restore the original Math.random function after each test
    Math.random = originalRandom;
  });

  // Test that the function returns the correct value for a "forced" random value
  it('should return "rock" for a random value of 0', () => {
    Math.random = jest.fn(() => 0);
    expect(getRandomHand()).toBe("rock");
  });

  it('should return "paper" for a random value of 0.34', () => {
    Math.random = jest.fn(() => 0.34);
    expect(getRandomHand()).toBe("paper");
  });

  it('should return "scissors" for a random value of 0.67', () => {
    Math.random = jest.fn(() => 0.67);
    expect(getRandomHand()).toBe("scissors");
  });
});

describe("getResultText", () => {
  it('should return "Draw!" if result is draw', () => {
    const text = getResultText("draw", "pvc");
    expect(text).toBe("Draw!");
  });

  it('should return "You win!" if result is left and mode is pvc', () => {
    const text = getResultText("left", "pvc");
    expect(text).toBe("You win!");
  });

  it('should return "R2D2 wins!" if result is left and mode is cvc', () => {
    const text = getResultText("left", "cvc");
    expect(text).toBe("R2D2 wins!");
  });
});
