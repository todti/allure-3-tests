@allure.label.framework:cucumber
Feature: Customer journeys

  Scenario: Password reset journey sends token and confirms delivery
    When the password reset flow runs for cucumber
    Then the cucumber flow completes
