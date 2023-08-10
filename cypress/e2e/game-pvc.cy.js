describe("player vs computer game", () => {
  it("plays a pvc game", () => {
    cy.visit("/");
    // History should be empty
    cy.get(".games-list").children().should("have.length", 0);
    // Start game
    cy.get('[data-action="pvc"]').click();
    cy.get(".game-type").should("contain", "Player vs Computer");
    cy.get(".rps-menu").should("not.be.visible");
    // Select paper
    cy.get('[data-hand="paper"]').click();

    // Both sides should display rock until hands are revealed
    cy.get(".player.left img").should("have.attr", "alt", "Rock");
    cy.get(".player.right img").should("have.attr", "alt", "Rock");
    cy.get(".countdown").should("contain", "3");
    cy.get(".countdown").should("contain", "2");
    cy.get(".countdown").should("contain", "1");

    // Player hand should be revealed with picked hand
    cy.get(".player.left img").should("have.attr", "alt", "paper");

    // Win, Lose or Draw result should be displayed
    cy.get(".result").should("satisfy", (elements) => {
      const gameResult = elements[0].textContent;
      return (
        gameResult === "You win!" ||
        gameResult === "You lose!" ||
        gameResult === "Draw!"
      );
    });
    cy.get(".rps-menu").should("be.visible");
    cy.get(".rps-menu .rps-main-menu").click();
    cy.get(".game-type").should("not.be.visible");

    // Check if game was recorded to history
    cy.get(".games-list").children().should("have.length", 1);
  });
});
