@allure.label.framework:cucumber
Feature: Inventory

  Scenario: Inventory shard lock causes intermittent sync failures
    When the flaky sync flow runs for cucumber
    Then the cucumber flow completes
