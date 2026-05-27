@allure.label.framework:cucumber
Feature: Reliability

  Scenario: Distributed cache misses on cold start then recovers after retry
    When the cache retry flow runs for cucumber
    Then the cucumber flow completes
