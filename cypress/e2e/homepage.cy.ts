describe('Homepage', () => {
  beforeEach(() => {
    cy.intercept('GET', '/v1/products(sku=*').as('productDetailed')
    cy.intercept('GET', '/v1/products(onSale=true)*').as('availableProducts')
    cy.intercept('GET', '/v1/products?*').as('products')
    cy.intercept('GET', '/v1/categories*').as('categories')
    cy.visit('/')
  })

  it('should show loading', () => {
    cy.getByTestId('loading').should('have.length', 2)
  })

  it('should show the left sidebar with logo', () => {
    cy.getByTestId('logo-img').should('be.visible')
  })

  it('should contain Home and About on navigation bar', () => {
    cy.getByTestId('navbar').find('ul li').should('have.length', 2)
  })

  it('should contain two different section titles', () => {
    cy.get('h2.text-2xl').should('contain', 'Todays Best Deals For You!')
    cy.get('h2.text-2xl').should('contain', 'Other Products')
  })

  it('should contain filters by name and by price', () => {
    cy.getByTestId('sort-by-name').should('be.visible')
    cy.getByTestId('sort-by-price').should('be.visible')
  })

  it('should contain categories dropdown', () => {
    cy.getByTestId('categories-dropdown').should('be.visible')
  })

  it('should open a product dialog when user click on select button on a specific product', () => {
    cy.getByTestId('available-products-list').find('.product-item').eq(0).find('button').contains('Select').click()
    cy.getByTestId('modal').should('be.visible')
  })

  it('should see modal with close button and being closed when clicked', () => {
    cy.wait('@availableProducts')
    cy.getByTestId('available-products-list').find('.product-item').eq(0).find('button').contains('Select').click()
    cy.getByTestId('close-modal').should('be.visible')
    cy.getByTestId('close-modal').click()
    cy.getByTestId('modal').should('not.exist')
  })

  it('should show all product details when modal is open', () => {
    cy.wait('@availableProducts')
    cy.getByTestId('available-products-list').find('.product-item').eq(0).find('button').contains('Select').click()
    cy.wait('@productDetailed')
      .its('response.body.products')
      .then((products) => {
        const product = products[0]
        cy.getByTestId('product-slider-prev').should('be.visible')
        cy.getByTestId('product-slider-next').should('be.visible')
        cy.getByTestId('product-image').should('be.visible')
        cy.getByTestId('product-name').invoke('attr', 'placeholder').should('contain', product.name)
        cy.getByTestId('product-show-full-description').click()
        cy.getByTestId('product-description').should('contain', product.longDescription)
        cy.getByTestId('product-shipping-options').should('have.length', product.shippingLevelsOfService.length)
      })
  })

  it('should got to next product or prev product when user click on next/prev buttons', () => {
    cy.wait('@availableProducts')
    cy.getByTestId('available-products-list').find('.product-item').eq(0).find('button').contains('Select').click()
    cy.wait('@productDetailed')
      .its('response.body.products')
      .then((products) => {
        const product = products[0]
        cy.getByTestId('product-name').invoke('attr', 'placeholder').should('contain', product.name)
        cy.getByTestId('product-slider-next').click()
        cy.getByTestId('product-name').invoke('attr', 'placeholder').should('not.contain', product.name)
        cy.getByTestId('product-slider-prev').click()
        cy.getByTestId('product-name').invoke('attr', 'placeholder').should('contain', product.name)
      })
  })

  it('should show a success message when user edit product to a new product name and its update on products list', () => {
    cy.wait('@availableProducts')
    cy.getByTestId('available-products-list').find('.product-item').eq(0).find('button').contains('Select').click()
    cy.wait('@productDetailed')
      .its('response.body.products')
      .then((products) => {
        const product = products[0]
        cy.getByTestId('product-name').invoke('attr', 'placeholder').should('contain', product.name)
        cy.getByTestId('product-name').type('Hello World{enter}')
        cy.getByTestId('product-name-changes').should('be.visible')
      })
  })

  it('should call different api calls when user try to sort for name or price', () => {
    const statusCodes: number[] = []

    cy.intercept('GET', '/v1/products?*', (req) => {
      req.continue((res) => {
        statusCodes.push(res.statusCode)
      })
    }).as('statusCodeProducts')

    cy.visit('/')

    cy.getByTestId('sort-by-name').find('button').contains('DESC').click()
    cy.getByTestId('loading').should('be.visible')
    cy.wait('@statusCodeProducts')
    cy.getByTestId('loading').should('not.exist')

    cy.getByTestId('sort-by-name').find('button').contains('ASC').click()
    cy.wait('@statusCodeProducts')

    cy.getByTestId('sort-by-price').find('button').contains('DESC').click()
    cy.wait('@statusCodeProducts')

    cy.getByTestId('sort-by-price').find('button').contains('ASC').click()
    cy.wait('@statusCodeProducts')

    cy.wrap(statusCodes).should((codes) => {
      expect(codes.every((code) => code === 200)).to.eq(true)
      expect(codes.length).to.eq(4)
    })
  })

  it('should delete a product when user click on delete', () => {
    cy.wait('@availableProducts')
    cy.getByTestId('available-products-list').find('.product-item').should('have.length', 5)
    cy.getByTestId('available-products-list').find('.product-item').eq(0).find('button').contains('Delete').click()
    cy.getByTestId('available-products-list').find('.product-item').should('have.length', 4)
  })

  it('should filter by category', () => {
    cy.wait('@categories')
    cy.getByTestId('categories-dropdown').click()
    cy.getByTestId('categories-dropdown').find('li').contains('Gift Ideas').click()
    cy.wait('@products')
    cy.getByTestId('not-found').should('be.visible')
  })
})
