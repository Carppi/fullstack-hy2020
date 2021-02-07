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

    describe('When logged in', function () {

      beforeEach(function () {
        cy.login({ username: 'tester', password: 'salainen' })
      })

      it('A blog can be created', function () {
        cy.get('#show-blog-form-button').click()
        cy.get('#title').type('Cypress test title')
        cy.get('#author').type('Cypress test Author')
        cy.get('#url').type('Cypress test URL')
        cy.get('#submit-blog-button').click()
        cy.get('.blog-list').contains('Cypress test title')
      })

      describe('and three blogs added', function () {

        beforeEach(function () {

          cy.createBlog({
            title: 'First title',
            author: 'Cypress test Author',
            blogUrl: 'Cypress test URL',
            likes: 5
          })

          cy.createBlog({
            title: 'Second title',
            author: 'Cypress test Author',
            blogUrl: 'Cypress test URL'
          })

          cy.createBlog({
            title: 'Third title',
            author: 'Cypress test Author',
            blogUrl: 'Cypress test URL',
            likes: 10
          })

        })

        it('A blog can be liked', function () {
          cy.contains('Second title')
            .find('.viewButton').click()

          cy.contains('Second title').parent().should('contain', 'Likes: 0')
          cy.contains('Second title').parent().find('.likeButton').click()
          cy.contains('Second title').parent().should('contain', 'Likes: 1')

        })

        it('A blog can be deleted', function () {
          cy.contains('Second title')
            .find('.viewButton').click()

          cy.get('.blog-list').should('contain', 'Second title')
          cy.contains('Second title').parent().find('.deleteButton').click()
          cy.get('.blog-list').should('not.contain', 'Second title')

        })

        describe('and a new user created logs in', function () {
          beforeEach(function () {
            cy.logout()
            const user = {
              name: 'Second User',
              username: 'user2',
              password: 'password'
            }
            cy.request('POST', 'http://localhost:3001/api/users/', user)
            cy.login({ username: 'user2', password: 'password' })
          })

          it('A blog of another user cannot be deleted', function () {
            cy.contains('Second title')
              .find('.viewButton').click()

            cy.get('.blog-list').should('contain', 'Second title')
            cy.contains('Second title').parent().should('not.contain','.deleteButton')

          })
        })
      })

    })

  })
})