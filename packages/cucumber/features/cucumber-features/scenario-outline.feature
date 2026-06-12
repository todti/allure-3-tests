@allure.label.framework:cucumber
@framework-specific
Feature: Cucumber · Gherkin advanced patterns

  Background:
    Given the cucumber showcase environment is initialized

  Scenario Outline: Validates payment method for <card_type> card
    Given a payment request with amount <amount> and currency "<currency>"
    When the card "<card_type>" with prefix "<prefix>" is validated
    Then the validation result should be "<result>"
    And the outcome is recorded in the allure report

    Examples:
      | card_type  | amount | currency | prefix | result   |
      | Visa       | 100    | USD      | 4      | approved |
      | Mastercard | 250    | EUR      | 5      | approved |
      | Amex       | 500    | GBP      | 37     | approved |
      | Unknown    | 50     | USD      | 9      | declined |

  Scenario: DocString attachment showcase
    Given the following JSON payload is submitted:
      """json
      {
        "event": "checkout.completed",
        "orderId": "ord-demo-001",
        "amount": 199.99,
        "items": [
          { "sku": "PROD-A", "qty": 2, "price": 49.99 },
          { "sku": "PROD-B", "qty": 1, "price": 100.01 }
        ]
      }
      """
    Then the payload is processed and attached to the report

  Scenario: Data table step showcase
    Given the following users are registered:
      | name         | role    | status |
      | Alice Admin  | admin   | active |
      | Bob Backend  | dev     | active |
      | Carol QA     | qa      | active |
      | Dave Deleted | viewer  | inactive |
    Then the user table is validated and attached to the report
