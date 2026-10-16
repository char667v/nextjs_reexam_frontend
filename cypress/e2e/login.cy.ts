describe("Login", () => {
  it("logs in and goes to the dashboard", () => {
    cy.visit("/pages/login"); // Hey browser, open the login page.

    cy.get('input[type="email"]').type("nyhedsbrifer+t1@gmail.com"); // Hey page, give me the email field, and type into it.
    cy.get('input[type="password"]').type("12121212");
    cy.contains("button", "Login").click();

    cy.url().should("include", "/pages/dashboard"); // assertion 1: the address now contains
    cy.window().then((win) => {
      expect(win.localStorage.getItem("access_token")).to.exist;// assertion 2: the token is stored in localStorage. That proves login worked, not just that the page changed.
    });
  });
    it("shows an error with a wrong password", () => {
    cy.visit("/pages/login");

    cy.get('input[type="email"]').type("nyhedsbrifer+t1@gmail.com");
    cy.get('input[type="password"]').type("wrongpassword");
    cy.contains("button", "Login").click();

    cy.contains("Forkert email eller adgangskode"); // the backend's 401 message is shown
    cy.url().should("include", "/pages/login");     // and the user stays on the login page
  });
});