describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Juho Siitonen',
      username: 'testimies',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testimies')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('testimies is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('festimies')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testimies', password: 'salasana' })
    })
    it('a new note can be created', function() {
      cy.contains('create').click()
      cy.get('#testTitle').type('testiblogi')
      cy.get('#testAuthor').type('testitekija')
      cy.get('#testUrl').type('www.testi.fi')
      cy.get('#createButton').click()
      cy.contains('testiblogi')
    })

    describe('Blogs', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'testiblogi',
          author: 'testitekija',
          url: 'www.testi.fi' })
        cy.contains('view').click()
      })
      it('can be liked', function() {
        cy.contains('like').click()
        cy.contains('likes 1')
      })
      it('can be removed', function() {
        cy.contains('remove').click()
        cy.contains('deletion succesfull')
      })
      it('cannot be removed by other than owner', function() {
        cy.contains('logout').click()
        const user2 = {
          name: 'Juha Siitonen',
          username: 'testimies2',
          password: 'salasana'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user2)
        cy.login({ username: 'testimies2', password: 'salasana' })
        cy.contains('view').click()
        cy.get('.removebutton').should('not.exist')
      })
      it('are shown in order of likes', function() {
        cy.createBlog2({
          title: 'most likes',
          author: 'testitekija',
          url: 'www.testi.fi',
          likes: 5 })
        cy.createBlog2({
          title: 'second most likes',
          author: 'testitekija',
          url: 'www.testi.fi',
          likes: 4 })
        cy.visit('http://localhost:3000')
        cy.get('.hiddenAsDefault').eq(0).should('contain', 'most likes')
        cy.get('.hiddenAsDefault').eq(1).should('contain', 'second most likes')
        cy.contains('second most likes')
          .contains('view').click()
        cy.get('.hiddenAsDefault').eq(1).contains('like').click()
        cy.wait(1000)
        cy.get('.hiddenAsDefault').eq(1).contains('like').click()
        cy.get('.hiddenAsDefault').eq(0).should('contain', 'second most likes')
      })
    })
  })
})