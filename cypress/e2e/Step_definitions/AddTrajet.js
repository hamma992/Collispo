
import { Given, When, Then, } from 'cypress-cucumber-preprocessor/steps'
import addTrajetObjects from '../Page_objects/AddTrajet'
import { slowCypressDown } from 'cypress-slow-down'

slowCypressDown(250)

const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const nextDay = `${yyyy}-${mm}-${dd}`;
const aftterTomorrow = new Date();
    aftterTomorrow.setDate(aftterTomorrow.getDate() + 2);
    const yyyy2 = aftterTomorrow.getFullYear();
    const mm2 = String(aftterTomorrow.getMonth() + 1).padStart(2, '0');
    const dd2 = String(aftterTomorrow.getDate()).padStart(2, '0');
    const nextDay2 = `${yyyy2}-${mm2}-${dd2}`;

beforeEach(() => {
    cy.intercept('POST', 'https://api.colispo.com/t_trajets').as('addTrajet');
     // [BeforeEach] Runs before each scenario to set up the initial state.
});

Given(`I am on the dashboard`, () => {
    cy.title().should('eq', 'Accueil');
});

When(`I click on the Add Trajet Button`, () => {
    cy.get(addTrajetObjects.AddTrajetButton).click();
    cy.log('test')    // [When] Describes the action or event that triggers the scenario.
});

When(`I fill the form with valid data`, () => {
    cy.get(addTrajetObjects.Villededepart).eq(0).should('be.visible').type('tunis, tunisie',{ delay: 150})
    cy.get(addTrajetObjects.submitgoogleaddress).eq(0).click();
    cy.get(addTrajetObjects.villedearrivee).eq(1).should('be.visible').type('Paris, France',{ delay: 150})
    cy.get(addTrajetObjects.submitgoogleaddress).eq(0).click();
    cy.get(addTrajetObjects.DateDepart).eq(0).should('be.visible').type(nextDay,{ delay: 150})
    cy.get(addTrajetObjects.DateArrivee).eq(1).should('be.visible').type(nextDay2,{ delay: 150})
    cy.get(addTrajetObjects.dayoption1).click();
    cy.get(addTrajetObjects.dayoption3).click();
    cy.get(addTrajetObjects.moyentransport).click();
    cy.get(addTrajetObjects.maxlength).type('100')
    cy.get(addTrajetObjects.maxwidth).type('100')
    cy.get(addTrajetObjects.maxheight).type('100')
    cy.get(addTrajetObjects.maxweight).click();
    cy.get(addTrajetObjects.collecthandtohandyes).click();
    cy.get(addTrajetObjects.collecrelaisno).click();
    cy.get(addTrajetObjects.delivraisonhandtohandyes).click();
    cy.get(addTrajetObjects.delivraisonrelaisno).click();
    cy.get(addTrajetObjects.submitbutton).click();
    cy.wait('@addTrajet').its('response.statusCode').should('eq', 201);
});

Then(`I should see the success message`, () => {
    cy.get(addTrajetObjects.successMessage).should('be.visible')
    .should('contain', 'Trajet ajouté avec succès ! Vous pouvez consulter vos trajets dans le tableau de bord dans la page "Mes trajets"')
    cy.screenshot() 
});


When(`I submit the form with empty fields`, () => {
  cy.get(addTrajetObjects.submitbutton).click();
});

Then(`I should see validation error messages for required fields`, () => {
  
  const expectedErrors = [
    'Veuillez saisir et sélectionner une adresse valide',

  ];

  expectedErrors.forEach((errorText) => {
    cy.get(addTrajetObjects.errorMessages[1]).should('exist');
  });

  cy.screenshot('AddTrajet_validation_errors_specific');
});

