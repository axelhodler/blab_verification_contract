var Verification = artifacts.require('./Verification.sol')
var Token = artifacts.require('./Token.sol')
var Membership = artifacts.require('./Membership.sol')

contract('Verification', accounts => {
  let verificationContract
  let tokenContract
  let membershipContractAddress
  let alice = accounts[0]
  let bob = accounts[1]
  let carol = accounts[2]
  let NERO_THE_NONMEMBER = accounts[3]

  let verify = (reportId, account) => {
    return verificationContract.verify(reportId, {from: account})
  }

  let isValid = (reportId) => {
    return verificationContract.isValid.call(reportId)
  }

  let verifiersFor = (reportId) => {
    return verificationContract.verifiersFor.call(reportId)
  }

  let submitWithCustomCompensation = (reportId, compensation, account) => {
    return verificationContract.submit(reportId, compensation, {from: account})
  }

  let submit = (reportId, account) => {
    return verificationContract.submit(reportId, 100, {from: account})
  }

  beforeEach(() => {
    return Verification.deployed().then(instance => {
      verificationContract = instance
    }).then(() => {
      return Membership.deployed()
    }).then(membershipContract => {
      membershipContractAddress = membershipContract.address
    }).then(() => {
      return verificationContract.token.call()
    }).then(tokenContractAddress => {
      tokenContract = web3.eth.contract(Token.abi).at(tokenContractAddress)
    })
  })

  describe('setup', () => {
    it('knows the connected membership contract address', () => {
      return verificationContract.membership.call().then(membershipAddress => {
        assert.equal(membershipAddress, membershipContractAddress)
      })
    })

    it('knows the connected token contract address', () => {
      return verificationContract.token.call().then(tokenAddress => {
        assert.equal(tokenAddress, tokenContract.address)
      })
    })

    it('is owner of the token contract', () => {
      return tokenContract.owner.call((err, ownerAddress) => {
        assert.equal(ownerAddress, verificationContract.address)
      })
    })
  })

  describe('submitting a report', () => {
    const report = 'DOCUMENT_HASH_0'

    it('sets the submitter in the report', () => {
      return submit(report, alice).then(() => {
        return verificationContract.submitterFor.call(report)
      }).then((submitter) => {
        assert.equal(submitter, alice)
      })
    })

    it('is not allowed to submit the same report twice', done => {
      submit(report, alice).catch(() => {
        assert.ok(true)
        done()
      }).then(() => {
        assert.fail()
        done()
      })
    })

    it('is not allowed for nonmembers', done => {
      submit('NONMEMBER_REPORT', NERO_THE_NONMEMBER).catch(() => {
        assert.ok(true)
        done()
      }).then(() => {
        assert.fail()
        done()
      })
    })
  })

  describe('verifying documents', () => {
    it('allows users to verify documents', () => {
      return submit('DOCUMENT_HASH', alice).then(() => {
        return verifiersFor('DOCUMENT_HASH')
      }).then(verifiers => {
        assert.equal(verifiers.length, 0)
        assert.sameDeepMembers(verifiers, [])
      })
    })
  })

  it('lists a document as valid after two verifications', () => {
    return submit('2ND_DOCUMENT_HASH', alice).then(() => {
      return verify('2ND_DOCUMENT_HASH', bob)
    }).then(() => {
      return verify('2ND_DOCUMENT_HASH', carol)
    }).then(() => {
      return isValid('2ND_DOCUMENT_HASH')
    }).then(contractIsValid => {
      assert.isTrue(contractIsValid)
    })
  })

  it('cannot be verified by the same person twice', () => {
    return submit('3ND_DOCUMENT_HASH', alice).then(() => {
      return verify('3ND_DOCUMENT_HASH', bob)
    }).then(() => {
      return verify('3ND_DOCUMENT_HASH', bob)
    }).then(() => {
      return verifiersFor('3ND_DOCUMENT_HASH')
    }).then((verifiers) => {
      assert.equal(verifiers.length, 1)
    })
  })

  it('is not possible for a nonmember to verify a report', done => {
    submit('4TH_DOCUMENT_HASH', alice).then(() => {
      return verify('4TH_DOCUMENT_HASH', NERO_THE_NONMEMBER);
    }).catch(() => {
      done()
    }).then(() => {
      assert.fail()
      done()
    })
  })

  it('is not possible to verify an unsubmitted report', done => {
    verify('5ND_DOCUMENT_HASH', alice)
      .catch(() => {
        assert.ok(true)
        done()
      }).then(() => {
      assert.fail()
      done()
    })
  })

  it('provides the amount of tokens the submitter chose after its fully verified', (done) => {
    const CHOSEN_COMPENSATION = 200;
    submitWithCustomCompensation('WORK_DONE', CHOSEN_COMPENSATION, bob).then(() => {
      return verify('WORK_DONE', alice)
    }).then(() => {
      return verify('WORK_DONE', carol)
    }).then(() => {
      tokenContract.getBalance.call(bob, (err, bobsTokenAmount) => {
        assert.equal(bobsTokenAmount.valueOf(), CHOSEN_COMPENSATION)
        done()
      })
    })
  })
})
