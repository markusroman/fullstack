describe("Blog ", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "Testi Testaaja",
      username: "testaaja",
      password: "salainen",
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:3000")
  })
  it("front page can be opened", function() {
    cy.contains("BLOGS")
  })
  it("login form can be opened", function() {
    cy.contains("log in").click()
  })
  describe("when logged in", function() {
    beforeEach(function() {
      cy.contains("log in").click()
      cy.get("#username").type("testaaja")
      cy.get("#password").type("salainen")
      cy.contains("login").click()
    })

    it("name of the user is shown", function() {
      cy.contains("Logged in as testaaja")
    })

    it("a new blog can be created", function() {
      cy.contains("new blog").click()
      cy.get("#title").type("Testiblogi")
      cy.get("#author").type("testaaja")
      cy.get("#url").type("www.testi.com")
      cy.contains("save").click()
      cy.get("[data-cy=blogs-table]").contains("Testiblogi")
    })

    it("can be logged out", function() {
      cy.contains("Logout").click()
      cy.contains("log in")
    })
    it("users can be shown", function() {
      cy.contains("users").click()
      cy.get("[data-cy=users-table]").contains("testaaja")
    })
    describe("and a blog is created", function() {
      beforeEach(function() {
        cy.contains("new blog").click()
        cy.get("#title").type("Testiblogi")
        cy.get("#author").type("testaaja")
        cy.get("#url").type("www.testi.com")
        cy.contains("save").click()
      })

      it("it can be clicked", function() {
        cy.get("[data-cy=blogs-table]")
          .contains("Testiblogi")
          .click()
        cy.contains("www.testi.com")
      })
      describe("and a blog is clicked", function() {
        beforeEach(function() {
          cy.get("[data-cy=blogs-table]")
            .contains("Testiblogi")
            .click()
        })

        it("it can be liked", function() {
          cy.get("[data-cy=like-button]").click()
          cy.get("[data-cy=blog-likes]").contains(1)
        })
      })
    })
  })
})
