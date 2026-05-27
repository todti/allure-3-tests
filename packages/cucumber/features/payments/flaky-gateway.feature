@allure.label.framework:cucumber
Feature: Payments

  Scenario: Payment gateway may timeout before authorization
    When the flaky gateway flow runs for cucumber
    Then the cucumber flow completes
