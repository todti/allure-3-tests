@allure.label.framework:cucumber
Feature: Catalog

  Scenario: Product search applies filters and pagination
    When the product search flow runs for cucumber
    Then the cucumber flow completes
