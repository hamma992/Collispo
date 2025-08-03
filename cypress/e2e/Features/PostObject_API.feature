Feature: Post Object API
As a user

Scenario: Add new object to the Api

Given I navigate to the API endpoint
When I send a POST request to the API endpoint
Then the response status code should be 200