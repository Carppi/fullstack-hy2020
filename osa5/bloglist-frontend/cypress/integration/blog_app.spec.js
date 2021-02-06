describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Teppo Testaaja',
      username: 'tester',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Teppo Testaaja logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('väärä salasana')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Teppo Testaaja logged in')
    })

    describe.only('When logged in', function () {
      beforeEach(function () {
        cy.get('#username').type('tester')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
      })

      it('A blog can be created', function () {
        cy.get('#show-blog-form-button').click()
        cy.get('#title').type('Cypress test title')
        cy.get('#author').type('Cypress test Author')
        cy.get('#url').type('Cypress test URL')
        cy.get('#submit-blog-button').click()
        cy.get('.blog-list').contains('Cypress test title')
      })
    })

  })
})