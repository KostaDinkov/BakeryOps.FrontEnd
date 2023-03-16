describe('Critical App functionality', () => {
  
  it('Guest should not be able to create a new order',()=>{
    cy.visit('/');  
    cy.getByDataAttr('NavBar-NewOrderBtn').should('exist');
    cy.getByDataAttr('NavBar-LoginBtn').should('exist');
    cy.getByDataAttr('NavBar-NewOrderBtn').click();
    cy.getByDataAttr('Error-error-message').should('exist');
    
  })
  it('User should be able to log in',()=>{
    cy.visit('/');  
    Login('kodin','kodin');
    cy.location('pathname').should('eq',"/").and(()=>{
    expect(localStorage.getItem('isLogged')).to.eq('true');
    });
    cy.getByDataAttr('NavBar-LogoutBtn').should('exist');    
  })
  
  it('User should be able to log out.',()=>{
    cy.visit('/'); 
    Login('kodin','kodin');
    cy.getByDataAttr('NavBar-LogoutBtn').click().and(()=>{
      expect(localStorage.getItem('isLogged')).to.eq('false');
      expect(localStorage.getItem('token')).to.eq('');
    })
    cy.getByDataAttr('NavBar-LoginBtn').should('exist');
  })
})

function Login(userName:string, password:string){
  cy.visit('/'); 
    cy.getByDataAttr('NavBar-LoginBtn').click();
    cy.getByDataAttr('LoginForm-nameInput').find('input').type(userName);
    cy.getByDataAttr('LoginForm-passwordInput').find('input').type(password);
    cy.getByDataAttr('LoginForm-loginBtn').click();
}