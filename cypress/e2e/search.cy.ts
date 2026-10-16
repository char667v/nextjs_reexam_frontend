describe("Search", () => {
  it("filters the wash halls by name", () => {
    cy.visit("/pages/login");
    cy.get('input[type="email"]').type("nyhedsbrifer+t1@gmail.com");
    cy.get('input[type="password"]').type("12121212");
    cy.contains("button", "Login").click();
    cy.url().should("include", "/pages/dashboard");

    cy.get('input[placeholder="Søg vaskehal"]').type("Herlev");
    cy.contains("Wash World Herlev");                   // the match is shown
    cy.contains("Wash World Søborg").should("not.exist"); // the others are filtered away

    cy.get('input[placeholder="Søg vaskehal"]').clear().type("xyz");
    cy.contains("Ingen vaskehaller fundet");            // the empty state is shown
  });
});