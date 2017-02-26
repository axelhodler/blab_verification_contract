var Membership = artifacts.require("./Membership.sol")

contract('Membership', (accounts) => {
  beforeEach(() => {
    return Membership.deployed().then(instance => {
      contract = instance;
    })
  })

  it('knows who is a member', () => {
    return contract.isMember.call(accounts[0]).then(isMember => {
      return assert.isTrue(isMember)
    }).then(() => {
      return contract.isMember.call(accounts[3])
    }).then(isMember => {
      assert.isFalse(isMember)
    })
  })
})
