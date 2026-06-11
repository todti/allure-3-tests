@allure.label.framework:cucumber
Feature: Payments

  Scenario: Captured payment is fully refunded to the card
    When the payment-refund flow runs for cucumber
    Then the cucumber flow completes
