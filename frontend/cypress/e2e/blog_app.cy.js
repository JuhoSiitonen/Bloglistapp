describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Juho Siitonen',
      username: 'testimies',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('[name="Username"]').type('testimies')
      cy.get('[name="Password"]').type('salasana')
      cy.get('.btn').click()
      cy.contains('testimies is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('[name="Username"]').type('festimies')
      cy.get('[name="Password"]').type('salasana')
      cy.get('.btn').click()
      cy.get('[style="color: green; background: lightgrey; font-size: 20px; border-style: solid; border-radius: 5px; padding: 10px; margin-bottom: 10px;"]').contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testimies', password: 'salasana' })
    })
    it('a new note can be created', function() {
      cy.contains('create').click()
      cy.get('#testTitle').type('testiblogi1')
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
        cy.contains('testiblogi').click()
      })
      it('can be liked', function() {
        cy.contains('like').click()
        cy.contains('1 likes')
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
        cy.visit('http://localhost:3003')
        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').should('contain', 'most likes')
        cy.get(':nth-child(2) > :nth-child(1) > a').should('contain', 'second most likes')
      })
    })
  })
})