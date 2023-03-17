import { closeSync, symlink } from "fs";

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
    cy.getByDataAttr("NavBar-NewOrderBtn").click();

    cy.getByDataAttr("OrderForm-clientNameInput")
      .find("input")
      .type("CypressTest");

    cy.get(".react-datepicker-wrapper")
      .find("input")
      .clear()
      .type("01/01/2023");

    cy.getByDataAttr("OrderForm-timeSelector")
      .find("input")
      .clear()
      .type("12:30{enter}");
    cy.getByDataAttr("OrderForm-phoneInput").find("input").type("123456789");
    cy.getByDataAttr("OrderForm-kaparoInput").find("input").type("5.55");

    cy.getByDataAttr("OrderForm-addProductBtn").click();

    cy.getByDataAttr("ProductSelector-productSelector")
      .find("input")
      .type("Торта{enter}");
    cy.getByDataAttr("ProductSelector-amountInput").find("input").type("2");
    cy.getByDataAttr("ProductSelector-cakeTitleInput")
      .find("input")
      .type("Happy Birthday");
    cy.getByDataAttr("ProductSelector-cakeFotoInput").find("input").type("999");
    cy.getByDataAttr("ProductSelector-descriptionCheckBox")
      .find("input")
      .check();
    cy.getByDataAttr("ProductSelector-descriptionInput")
      .find("textarea")
      .first()
      .type("Happy birthday cake for cypress");
    cy.getByDataAttr('OrderForm-submitBtn').click();

    cy.location('pathname').should('include',"/orders/print/");
    cy.getByDataAttr('PrintOrderView-container').should('exist');
  });
});

function Login(userName: string, password: string) {
  cy.visit("/");
  cy.getByDataAttr("NavBar-LoginBtn").click();
  cy.getByDataAttr("LoginForm-nameInput").find("input").type(userName);
  cy.getByDataAttr("LoginForm-passwordInput").find("input").type(password);
  cy.getByDataAttr("LoginForm-loginBtn").click();
}
