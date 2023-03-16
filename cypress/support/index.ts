declare namespace Cypress {
    interface Chainable {
      getByDataAttr(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    }
  }