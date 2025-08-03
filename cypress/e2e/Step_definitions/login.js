import { Given, When, Then, } from 'cypress-cucumber-preprocessor/steps'
import loginElements from '../Page_objects/loginObjects.js'

let tokenUser = null

beforeEach(() => {
    cy.intercept('POST', 'https://api.colispo.com/users/login').as('loginRequest')
})

Given("I am on the login page", () => {
    cy.log("navigating to login page")
    cy.visit(loginElements.loginURL)
});

When("I enter valid credentials", () => {
    cy.log("entering valid credentials")
    cy.get(loginElements.emailInput).should('be.empty').type('mohamedbendhief96@gmail.com')
    cy.get(loginElements.passwordInput).should('be.empty').should('have.attr', 'type', 'password').type('Dougga123')
    cy.get(loginElements.submitBTN).should('be.visible').click()

    cy.wait('@loginRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(200)
        expect(interception.request.body).to.have.property('email', loginElements.inputemail)
        expect(interception.request.body).to.have.property('password', loginElements.inputpassword)
        expect(interception.response.body).to.have.property('token')

        tokenUser = interception.response.body.token
        cy.log("Token received: " + tokenUser)

    })
});

Then("I should be redirected to the dashboard", () => {
    cy.log("verifying redirection to dashboard")
    cy.get(loginElements.MonCompte).should('be.visible').click()
    cy.title().should('eq', 'Accueil')
    cy.screenshot('Dashboard')
});

When ('I enter {string} in the email field', (email) => {
    if (email) {
        cy.get(loginElements.emailInput).type(email)
    } else {
        cy.get(loginElements.emailInput).clear()
    }
});

And ('I enter {string} in the password field', (password) => {
    if (password) {
        cy.get(loginElements.passwordInput).type(password)
    } else {
        cy.get(loginElements.passwordInput).clear()
    }
});

And ('I click on the submit button', () => {
    cy.get(loginElements.submitBTN).click()
});

Then ('I should see the message {string}', (message) => {
    cy.get(loginElements.AlertMessage).should('be.visible').and('contain', message)
});

