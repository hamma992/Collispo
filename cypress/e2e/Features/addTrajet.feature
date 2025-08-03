Feature: Add Trajet

  Background: Valid login
    Given I am on the login page
    When I enter valid credentials
    Then I should be redirected to the dashboard

  Scenario: Add Trajet with valid data
    Given I am on the dashboard
    When I click on the Add Trajet Button
    And I fill the form with valid data
    Then I should see the success message

  Scenario: Add Trajet with empty fields (invalid case)
    Given I am on the dashboard
    When I click on the Add Trajet Button
    And I submit the form with empty fields
    Then I should see validation error messages for required fields
