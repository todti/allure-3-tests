@allure.label.framework:cucumber
Feature: Payments

  Scenario: Payment intent is authorized against card token
    When the payment-authorization flow runs for cucumber
    Then the cucumber flow completes
