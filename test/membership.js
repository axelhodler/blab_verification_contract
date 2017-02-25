var Membership = artifacts.require("./Membership.sol")

contract('Membership', (accounts) => {
  beforeEach(() => {
    return Membership.deployed().then(instance => {
      contract = instance;
    })
  })

  it('has no members', () => {
    return contract.isMember.call(accounts[0]).then(isMember => {
      assert.isFalse(isMember)
    })
  })
})
