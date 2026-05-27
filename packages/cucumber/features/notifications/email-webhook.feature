@allure.label.framework:cucumber
Feature: Notifications

  Scenario: Email provider webhook fan-out completes asynchronously
    When the email webhook flow runs for cucumber
    Then the cucumber flow completes
