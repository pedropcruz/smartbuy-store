describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about')
  })
  it('should get image and some random text', () => {
    cy.get('img').should('be.visible')
    cy.get('p').should('be.visible')
  })
})
