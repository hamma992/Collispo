Feature: Delete Object
As a user

Scenario: Delete existing object from the API
    Given I navigate to the API endpoint
    And I create a new object via POST
    When I send a DELETE request to the API
    Then the response status code should be 200





