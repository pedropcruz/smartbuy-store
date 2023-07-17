describe('Error page', () => {
  beforeEach(() => {
    cy.visit('/foo')
  })

  it('shoud show error page when entering on wrong route', () => {
    cy.get('h1').contains('404').should('be.visible')
    cy.get('p').contains("Something's missing.").should('be.visible')
  })
})
