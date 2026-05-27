@allure.label.framework:cucumber
Feature: Authentication

  Scenario: OAuth login grants access token
    When the oauth login flow runs for cucumber
    Then the cucumber flow completes
