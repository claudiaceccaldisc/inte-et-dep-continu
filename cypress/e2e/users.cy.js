describe("Stack fullstack - E2E réel", () => {
  it("l'API de santé répond correctement", () => {
    cy.request("http://localhost:8000/health").then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("status", "ok")
    })
  })

  it("l'API /users renvoie une liste non vide", () => {
    cy.request("http://localhost:8000/users").then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property("utilisateurs")
      expect(response.body.utilisateurs).to.be.an("array")
      expect(response.body.utilisateurs.length).to.be.greaterThan(0)
    })
  })

  it("le frontend charge et affiche le compteur", () => {
    cy.visit("http://localhost:3000/")
    cy.contains("Users manager").should("exist")
    cy.contains(/user\(s\) already registered/i).should("exist")
  })

  it("le nombre affiché dans le frontend correspond au nombre renvoyé par l'API", () => {
    cy.request("http://localhost:8000/users").then((response) => {
      const total = response.body.utilisateurs.length

      cy.visit("http://localhost:3000/")

      cy.contains(/user\(s\) already registered/i).should(($el) => {
        const text = $el.text()
        const match = text.match(/\d+/)

        expect(match).to.not.be.null
        expect(Number(match[0])).to.eq(total)
      })
    })
  })

  it("les utilisateurs seedés sont présents dans l'API", () => {
    cy.request("http://localhost:8000/users").then((response) => {
      const noms = response.body.utilisateurs.map((u) => u.nom)

      expect(noms).to.include("Claudia")
      expect(noms).to.include("Kira")
      expect(noms).to.include("Clow")
    })
  })
})