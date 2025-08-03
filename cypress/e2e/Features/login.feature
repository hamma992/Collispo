Feature: login

    Login as a user

    Scenario: Valid login
        Given I am on the login page
        When I enter valid credentials
        Then I should be redirected to the dashboard

    Scenario Outline: Login with invalid credentials
        Given I am on the login page
        When I enter "<email>" in the email field
        And I enter "<password>" in the password field
        And I click on the submit button
        Then I should see the message "<message>"
        Examples:
            | email                       | password  | message                                   |
            | mohamedbendhief96@gmail.com | 000       | Veuillez saisir un mot de passe valide    |
            | mohamedbendhief96@gmail.    | Dougga123 | Veuillez saisir une adresse e-mail valide |
            | mohamedbendhief96@gmail.com |           | Veuillez saisir un mot de passe           |
            |                             | Dougga123 | Veuillez saisir l'adresse e-mail          |
            |                             |           | Veuillez saisir l'adresse e-mail          |
            |                             |           | Veuillez saisir un mot de passe           |
