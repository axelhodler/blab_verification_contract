var Membership = artifacts.require("./Membership.sol")

contract('Membership', (accounts) => {
  const OWNER = accounts[0]

  beforeEach(() => {
    return Membership.deployed().then(instance => {
      contract = instance;
    })
  })

  it('has an owner', () => {
    return contract.manager.call().then(ownerAddress => {
      assert.equal(ownerAddress, OWNER)
    })
  })

  it('has the owner as first member', () => {
    return contract.isMember.call(OWNER).then(isMember => {
      return assert.isTrue(isMember)
    })
  })

  it('can add members via owner', () => {
    const MEMBER = accounts[3];
    return contract.addMember(MEMBER, {from: OWNER}).then(() => {
      return contract.isMember.call(MEMBER)
    }).then(isMember => {
      assert.isTrue(isMember)
    })
  })

  it('knows who is not a member', () => {
    return contract.isMember.call(accounts[1]).then(isMember => {
      assert.isFalse(isMember)
    })
  })
})
