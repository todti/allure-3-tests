@allure.label.framework:cucumber
Feature: Payments

  Scenario: Daily settlement report is generated and submitted to acquiring bank
    When the settlement-report flow runs for cucumber
    Then the cucumber flow completes
