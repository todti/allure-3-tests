@allure.label.framework:cucumber
Feature: Adapter parity

  Scenario: Allure metadata baseline documents runtime API surface
    When the metadata flow runs for cucumber
    Then the cucumber flow completes
