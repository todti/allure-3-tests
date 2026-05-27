@allure.label.framework:cucumber
Feature: Checkout

  Scenario: Checkout tax engine calculates VAT in nested steps
    When the tax calculation flow runs for cucumber
    Then the cucumber flow completes
