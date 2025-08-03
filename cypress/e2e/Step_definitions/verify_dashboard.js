import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import dashboardElements from '../Page_objects/verifyDashboardPage.js';

Given('I am on the dashboard page', () => {
  cy.visit(dashboardElements.dashboardURL);

});

Then('I should see the dashboard elements', () => {
  
  cy.title().should('eq', 'Accueil');
  //  Navbar
  cy.get(dashboardElements.navbar).should('be.visible');

  //  Carrousel
  cy.get(dashboardElements.carousel).should('be.visible');

  //  Bloc de recherche
  cy.get(dashboardElements.searchBlock).should('be.visible');

  //  Google Maps input
  cy.get(dashboardElements.googleMapInput).should('be.visible');
});

Then('I should see the dashboard title', () => {
  //  Meta Description
  cy.document().then((doc) => {
    const meta = doc.querySelector('meta[name="description"]');
    expect(meta).to.not.be.null;
    expect(meta.getAttribute('content')).to.not.be.empty;
  });
});

Then('The dashboard API should respond correctly', () => {
  cy.intercept('GET', dashboardElements.apiEndpoint).as('getDashboardData');
  cy.reload();
  cy.wait('@getDashboardData').its('response.statusCode').should('eq', 200);
});
