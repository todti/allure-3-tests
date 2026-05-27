@allure.label.framework:cucumber
Feature: API

  Scenario: Public API health endpoint responds with 200
    When the health check flow runs for cucumber
    Then the cucumber flow completes
