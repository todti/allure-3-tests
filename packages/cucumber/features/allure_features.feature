@allure.label.framework:cucumber
@allure.label.language:typescript
Feature: Allure 3 extended showcase (Cucumber)

  @allure.label.epic:AllureDemo
  @allure.label.feature:RuntimeAPI
  @allure.label.story:MetadataAndSteps
  Scenario: Metadata baseline via shared showcase
    Given framework labels are applied for cucumber
    When the shared Allure feature showcase runs
    Then the HTTP smoke step completes successfully

  @flaky
  Scenario: Deep nested Allure steps
    Given framework labels are applied for cucumber
    When the deep nested steps scenario runs
    Then the step completes with attachment

  @flaky
  Scenario: Attachment gallery
    Given framework labels are applied for cucumber
    When the attachment gallery scenario runs
    Then the step completes with attachment

  @flaky
  Scenario: Flaky payment gateway
    Given framework labels are applied for cucumber
    When the flaky payment scenario runs
    Then the step completes with attachment

  @flaky
  Scenario: Flaky inventory sync
    Given framework labels are applied for cucumber
    When the flaky inventory scenario runs
    Then the step completes with attachment

  @flaky
  Scenario: Retry then pass
    Given framework labels are applied for cucumber
    When the retry then pass scenario runs
    Then the step completes with attachment

  Scenario: Known failure for dashboards
    Given framework labels are applied for cucumber
    When the known failure scenario runs
    Then the step completes with attachment
