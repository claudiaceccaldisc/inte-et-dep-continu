describe("Users - E2E réel", () => {
  it("affiche les utilisateurs depuis la vraie API", () => {
    cy.request("http://localhost:8000/users").then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("utilisateurs")
      expect(response.body.utilisateurs.length).to.be.greaterThan(0)
    })

    cy.visit("http://localhost:3000/")

    cy.contains(/user\(s\) already registered|utilisateur\(s\) inscrit\(s\)/i)
      .should("exist")
  })
})
