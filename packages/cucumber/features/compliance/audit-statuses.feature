@allure.label.framework:cucumber
Feature: Compliance

  Scenario: Audit pipeline records passed, skipped, and broken steps
    When the audit statuses flow runs for cucumber
    Then the cucumber flow completes
