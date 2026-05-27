@allure.label.framework:cucumber
Feature: Reporting

  Scenario: Reporting export bundles multiple attachment formats
    When the export attachments flow runs for cucumber
    Then the cucumber flow completes
