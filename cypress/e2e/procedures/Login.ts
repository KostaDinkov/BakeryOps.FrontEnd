export default function Login(userName: string, password: string) {
    cy.visit("/");
    cy.getByDataAttr("NavBar-LoginBtn").click();
    cy.getByDataAttr("LoginForm-nameInput").find("input").type(userName);
    cy.getByDataAttr("LoginForm-passwordInput").find("input").type(password);
    cy.getByDataAttr("LoginForm-loginBtn").click();
}