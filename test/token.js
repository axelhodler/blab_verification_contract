var token = artifacts.require('./Token.sol')
var verification = artifacts.require('./Verification')

contract('token - creation', accounts => {
  const CONTRACT_CREATOR = accounts[0]
  let verificationContractAddress
  let tokenContract

  beforeEach(() => {
    return verification.deployed().then(instance => {
      verificationContractAddress = instance.address
    }).then(() => {
      return token.deployed()
    }).then(instance => {
      tokenContract = instance;
    })
  })

  it('initially sets the contract creator as owner', () => {
    tokenContract.owner.call().then(contractOwner => {
      assert.equal(contractOwner, CONTRACT_CREATOR)
    })
  })

  describe('setting up the wiring', () => {
    before(() => {
      return tokenContract.setUpWiring(verificationContractAddress, {from: CONTRACT_CREATOR})
    })

    it('gives 100000 Tokens to the verification contract after setting up the wiring', function() {
      return tokenContract.getBalance.call(verificationContractAddress).then(balance => {
        assert.equal(balance.valueOf(), 100000)
      })
    })

    it('sets the verificationcontract as the new owner', () => {
      return tokenContract.owner.call().then(updatedOwner => {
        assert.equal(updatedOwner, verificationContractAddress)
      })
    })
  })

})
