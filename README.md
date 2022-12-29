# Case study on BDD / ATDD 

My goal is to implement the "Account holder withdraws cash" feature,
for backend and frontend. The example feature is taken from <https://support.smartbear.com/cucumberstudio/docs/bdd/write-gherkin-scenarios.html> where I removed the last "and" step. 


```feature
Feature: Account Holder withdraws cash
 
Scenario: Account has sufficient funds
    Given The account balance is $100
      And the card is valid
      And the machine contains enough money
     When the Account Holder requests $20
     Then the ATM should dispense $20
      And the account balance should be $80
```
