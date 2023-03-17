import CreateOrder from "./procedures/CreateOrder";
import Login from "./procedures/Login";

describe("Critical App functionality", () => {
  it("Guest should not be able to create a new order", () => {
    cy.visit("/");
    cy.getByDataAttr("NavBar-NewOrderBtn").should("exist");
    cy.getByDataAttr("NavBar-LoginBtn").should("exist");
    cy.getByDataAttr("NavBar-NewOrderBtn").click();
    cy.getByDataAttr("Error-error-message").should("exist");
  });
  it("User should be able to log in", () => {
    cy.visit("/");
    Login("kodin", "kodin");
    cy.location("pathname")
      .should("eq", "/")
      .and(() => {
        expect(localStorage.getItem("isLogged")).to.eq("true");
      });
    cy.getByDataAttr("NavBar-LogoutBtn").should("exist");
  });

  it("User should be able to log out.", () => {
    cy.visit("/");
    Login("kodin", "kodin");
    cy.getByDataAttr("NavBar-LogoutBtn")
      .click()
      .and(() => {
        expect(localStorage.getItem("isLogged")).to.eq("false");
        expect(localStorage.getItem("token")).to.eq("");
      });
    cy.getByDataAttr("NavBar-LoginBtn").should("exist");
  });

  it("User should be able to create an order", () => {
    Login(Cypress.env("username"), Cypress.env("password"));
    CreateOrder('01/01/2023');
  });
  
  it("User should be able to delete an order", () => {
    Login(Cypress.env("username"), Cypress.env("password"));
    CreateOrder('02/01/2023');
    cy.visit("/orders/forDay/2023-01-02");
    cy.get("[data-test='OrderCard-EditLink']").should('have.length', 1).click();
    cy.getByDataAttr("OrderForm-deleteBtn").click();
    cy.getByDataAttr("DeleteOrderDialog-deleteBtn").click();
    cy.location("pathname").should('include','/orders/forDay/2023-01-02');
    cy.getByDataAttr("DayView-noOrdersDiv").invoke('text').then((text)=>{expect(text).to.eq(`Няма поръчки за 2-ри януари, 2023 г.`)});

  });
});
