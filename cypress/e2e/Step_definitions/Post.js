import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'


Given(`I navigate to the API endpoint`, () => {
    cy.visit('https://restful-api.dev/')
    cy.log('Navigating to the API endpoint...')
    // [Given] Sets up the initial state of the system.
});

When(`I send a POST request to the API endpoint`, () => {
    cy.log('Sending POST request to the API endpoint...')
    cy.request('POST', 'https://api.restful-api.dev/objects', {
        "name": "TEST PRODUCT AUTOMATION",
        "data": {
        "year": 2025,
        "price": 2500.99,
        "CPU model": "Cypress automation",
        "Hard disk size": "1 TB"
    }
}).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('name', "TEST PRODUCT AUTOMATION")
        cy.log('Response body:', JSON.stringify(response.body, null, 2))
        cy.log(`Created object ID: ${response.body.id}`)
    })
})

Then(`the response status code should be {int}`, (arg0) => {
    // [Then] Describes the expected outcome or result of the scenario.
    expect(arg0).to.eq(200)
})