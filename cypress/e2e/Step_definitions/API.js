import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given(`I have the API endpoint {string}`, (arg0) => {
    cy.log('setting up API endpoint: ' + arg0);
    // [Given] Sets up the initial state of the system.
});

When(`I send A GET request to the API endpoint`, () => {
    cy.log('sending GET request to API endpoint');
    cy.request({
        method: 'GET', 
        url: 'https://api.restful-api.dev/objects',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.not.be.empty;
        expect(response.duration).to.be.lessThan(2000); // Check if the response time is less than 2 seconds
        expect(response.body).to.be.an('array');
        cy.wrap(response).as('apiResponse'); // ✅ stocker la réponse pour les steps Then
    });
    // [When] Describes the action or event that triggers the scenario.
});

Then(`the response status code should be {int}`, (arg0) => {
    cy.get('@apiResponse').then((response) => {
        expect(response.status).to.eq(arg0);
    });
    // [Then] Describes the expected outcome or result of the scenario.
});

Then(`the response body should not be empty`, () => {
    cy.get('@apiResponse').then((response) => {
        expect(response.body).to.not.be.empty;
    });
    cy.log('verifying response body is not empty');
});
