describe("computer vs computer game", () => {
  it("plays a cvc game", () => {
    cy.visit("/");
    // History should be empty
    cy.get(".games-list").children().should("have.length", 0);
    // Start game
    cy.get('[data-action="cvc"]').click();
    cy.get(".game-type").should("contain", "R2D2 vs C3PO");
    cy.get(".rps-menu").should("not.be.visible");

    // PvC hand picker should not be visible
    cy.get('[data-visibility="pvc"]').should("not.be.visible");

    // Both sides should display rock until hands are revealed
    cy.get(".player.left img").should("have.attr", "alt", "Rock");
    cy.get(".player.right img").should("have.attr", "alt", "Rock");
    cy.get(".countdown").should("contain", "3");
    cy.get(".countdown").should("contain", "2");
    cy.get(".countdown").should("contain", "1");

    // Winning robot or Draw should be displayed
    cy.get(".result").should("satisfy", (elements) => {
      const gameResult = elements[0].textContent;
      return (
        gameResult === "C3PO wins!" ||
        gameResult === "R2D2 wins!" ||
        gameResult === "Draw!"
      );
    });
    cy.get(".rps-menu").should("be.visible");
    // Check if game was recorded to history
    cy.get(".games-list").children().should("have.length", 1);
  });
});
