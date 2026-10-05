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
});