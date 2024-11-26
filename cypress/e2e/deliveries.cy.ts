// cypress test to check if the deliveries route opens correctly
describe("Deliveries", () => {
  it("Should open deliveries route", () => {
    cy.visit("/deliveries");
    cy.location("pathname").should("eq", "/deliveries");
  });
  // clicking the add button should open the form
    it("Should open add form with default fields", () => {
        cy.visit("/deliveries");
        cy.wait(1000);
        cy.get("button").contains("Нов").click();
        cy.wait(1000);
        cy.get("form").should("exist");
        cy.get(`[data-testid="documentNumber"]`).should("exist");
    });
});
