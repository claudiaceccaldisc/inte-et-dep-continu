describe("TP4 - Navigation & API Simulation", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });


  it("affiche la page d'accueil avec compteur initial à 0", () => {
    cy.contains("Accueil");
    cy.contains("0 utilisateur(s) inscrit(s)");
  });

  it("navigation vers le formulaire", () => {
    cy.contains("Aller au formulaire").click();
    cy.url().should("include", "/register");
  });

  it("inscription réussie → compteur incrémenté + utilisateur dans la liste", () => {

    // Interception API succès
    cy.intercept("POST", "**/users", {
      statusCode: 200,
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "john@mail.com",
        birthDate: "2000-01-01",
        city: "Paris",
        postalCode: "75000"
      }
    }).as("saveUser");

    cy.contains("Aller au formulaire").click();

    cy.get('input[placeholder="Prénom"]').type("John");
    cy.get('input[placeholder="Nom"]').type("Doe");
    cy.get('input[placeholder="Email"]').type("john@mail.com");
    cy.get('[data-testid="birthDate"]').type("2000-01-01");
    cy.get('input[placeholder="Ville"]').type("Paris");
    cy.get('input[placeholder="Code postal"]').type("75000");

    cy.contains("S'inscrire").click();

    cy.wait("@saveUser");

    cy.contains("Retour à l'accueil").click();

    // Vérification compteur
    cy.contains("1 utilisateur(s) inscrit(s)");

    // Vérification présence utilisateur dans la liste
    cy.contains("John Doe");
  });

  it("gestion erreur API simulée (500) → compteur inchangé + liste inchangée", () => {

    // Interception API erreur 500
    cy.intercept("POST", "**/users", {
      statusCode: 500
    }).as("saveUserFail");

    cy.contains("Aller au formulaire").click();

    cy.get('input[placeholder="Prénom"]').type("Test");
    cy.get('input[placeholder="Nom"]').type("Error");
    cy.get('input[placeholder="Email"]').type("error@mail.com");
    cy.get('[data-testid="birthDate"]').type("2000-01-01");
    cy.get('input[placeholder="Ville"]').type("Paris");
    cy.get('input[placeholder="Code postal"]').type("75000");

    cy.contains("S'inscrire").click();

    cy.wait("@saveUserFail");

    cy.get('[data-testid="error"]')
      .should("contain", "Erreur serveur");

    // Retour accueil
    cy.contains("Retour à l'accueil").click();

    cy.contains("0 utilisateur(s) inscrit(s)");

    cy.contains("Aller au formulaire"); 
  });

  it("gère un timeout réseau (forceNetworkError)", () => {

    cy.intercept("POST", "**/users", {
      forceNetworkError: true
    }).as("networkError");

    cy.contains("Aller au formulaire").click();

    cy.get('input[placeholder="Prénom"]').type("Timeout");
    cy.get('input[placeholder="Nom"]').type("User");
    cy.get('input[placeholder="Email"]').type("timeout@mail.com");
    cy.get('[data-testid="birthDate"]').type("2000-01-01");
    cy.get('input[placeholder="Ville"]').type("Paris");
    cy.get('input[placeholder="Code postal"]').type("75000");

    cy.contains("S'inscrire").click();

    cy.get('[data-testid="error"]')
      .should("contain", "Erreur serveur");
  });

});
