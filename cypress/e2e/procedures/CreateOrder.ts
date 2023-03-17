export default function CreateOrder(date:string){
    cy.getByDataAttr("NavBar-NewOrderBtn").click();
  
      cy.getByDataAttr("OrderForm-clientNameInput")
        .find("input")
        .type("CypressTest");
  
      cy.get(".react-datepicker-wrapper")
        .find("input")
        .clear()
        .type(date);
  
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
  }