import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given(`I navigate to the API endpoint`, () => {
cy.visit('https://restful-api.dev/')
cy.log('Navigating to the API endpoint...')
})

Given(`I create a new object via POST`, () => {
cy.log('Creating a new object to delete later...')
cy.request('POST', 'https://api.restful-api.dev/objects', {
    name: 'OBJECT TO DELETE',
    data: {
year: 2024,
price: 1500,
CPU: 'To be deleted',
Storage: '512 GB'
    }
}).then((response) => {
    expect(response.status).to.eq(200)
    cy.wrap(response.body.id).as('objectId') 
    cy.log(`Object created with ID: ${response.body.id}`)
})
})

When('I send a DELETE request to the API', function () {
cy.get('@objectId').then((id) => {
    cy.log(`Sending DELETE request for object ID: ${id}`)
    cy.request('DELETE', `https://api.restful-api.dev/objects/${id}`).as('apiResponse')
})
})

Then(`the response status code should be {int}`, (arg0) => {
cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(arg0);
});
});
