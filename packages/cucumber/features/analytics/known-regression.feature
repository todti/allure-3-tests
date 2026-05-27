@allure.label.framework:cucumber
Feature: Analytics

  Scenario: Known regression remains red for dashboard analytics
    When the known regression flow runs for cucumber
    Then the cucumber flow completes
