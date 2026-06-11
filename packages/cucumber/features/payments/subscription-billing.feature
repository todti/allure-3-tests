@allure.label.framework:cucumber
Feature: Payments

  Scenario: Recurring subscription cycle charges stored payment method
    When the subscription-billing flow runs for cucumber
    Then the cucumber flow completes
