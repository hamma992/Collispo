Feature: Test Api

    To ensure the API is working correctly


Scenario: Send Get Request to the API
    Given I have the API endpoint "https://api.restful-api.dev/objects"
    When I send A GET request to the API endpoint
    Then the response status code should be 200
    And the response body should not be empty


