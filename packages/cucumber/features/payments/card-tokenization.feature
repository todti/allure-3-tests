@allure.label.framework:cucumber
Feature: Payments

  Scenario: Card number is tokenized via PCI vault
    When the card-tokenization flow runs for cucumber
    Then the cucumber flow completes
