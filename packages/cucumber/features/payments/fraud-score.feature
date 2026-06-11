@allure.label.framework:cucumber
Feature: Payments

  Scenario: Fraud model scores transaction and auto-approves low-risk payment
    When the fraud-score flow runs for cucumber
    Then the cucumber flow completes
