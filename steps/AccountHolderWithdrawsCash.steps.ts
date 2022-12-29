import { defineFeature, loadFeature } from "jest-cucumber"

const feature = loadFeature("features/AccountHolderWithdrawsCash.feature")

defineFeature(feature, (test) => {
  test("Account has sufficient funds", ({
    given,
    and,
    when,
    then,
    pending,
  }) => {
    given(/^The account balance is \$(\d+)$/, (arg0) => {
      pending()
    })
    and("the card is valid", () => {
      pending()
    })
    and("the machine contains enough money", () => {
      pending()
    })
    when(/^the Account Holder requests \$(\d+)$/, (arg0) => {
      pending()
    })
    then(/^the ATM should dispense \$(\d+)$/, (arg0) => {
      pending()
    })
    and(/^the account balance should be \$(\d+)$/, (arg0) => {
      pending()
    })
  })
})
