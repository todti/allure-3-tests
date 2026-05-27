@allure.label.framework:cucumber
@allure.label.language:typescript
Feature: Allure 3 feature showcase (Cucumber)

  @allure.label.epic:AllureDemo
  @allure.label.feature:RuntimeAPI
  @allure.label.story:MetadataAndSteps
  Scenario: Demonstrates shared Allure runtime API via Cucumber steps
    Given framework labels are applied for cucumber
    When the shared Allure feature showcase runs
    Then the HTTP smoke step completes successfully
