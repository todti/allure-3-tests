@allure.label.framework:cucumber
Feature: Users

  Scenario: User profile stores masked and hidden parameters
    When the profile params flow runs for cucumber
    Then the cucumber flow completes
