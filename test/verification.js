var Verification = artifacts.require("./Verification.sol")

contract('Verification', (accounts) => {
  let contract;
  let alice = accounts[0];
  let bob = accounts[1];
  let carol = accounts[2];
  let NERO_THE_NONMEMBER = accounts[3];

  let verify = (reportId, account) => {
    return contract.verify(reportId, {from: account});
  };

  let isValid = (reportId) => {
    return contract.isValid.call(reportId);
  };

  let verifiersFor = (reportId) => {
    return contract.verifiersFor.call(reportId);
  };

  let submit = (reportId, account) => {
    return contract.submit(reportId, {from: account})
  };

  beforeEach(() => {
    return Verification.deployed().then(instance => {
      contract = instance;
    });
  });

  describe('submitting a report', () => {
    const report = 'DOCUMENT_HASH_0';

    it('sets the submitter in the report', () => {
      return submit(report, alice).then(() => {
        return contract.submitterFor.call(report).then((submitter) => {
          assert.equal(submitter, alice);
        })
      })
    });

    it('is not allowed to submit the same report twice', done => {
      submit(report, alice).catch(() => {
        assert.ok(true);
        done();
      }).then(() => {
        assert.fail();
        done();
      });
    });

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

  it('allows users to verify documents', () => {
    return submit('DOCUMENT_HASH', alice).then(() => {
      return verifiersFor('DOCUMENT_HASH').then((verifiers) => {
        assert.equal(verifiers.length, 0);
        assert.sameDeepMembers(verifiers, []);
      });
    })
  });

  it('lists a document as valid after two verifications', () => {
    return submit('2ND_DOCUMENT_HASH', alice).then(() => {
      return verify('2ND_DOCUMENT_HASH', bob).then(() => {
        return verify('2ND_DOCUMENT_HASH', carol).then(() => {
          return isValid('2ND_DOCUMENT_HASH').then((contractIsValid) => {
            assert.isTrue(contractIsValid);
          })
        });
      });
    });
  });

  it('cannot be verified by the same person twice', () => {
    return submit('3ND_DOCUMENT_HASH', alice).then(() => {
      return verify('3ND_DOCUMENT_HASH', bob).then(() => {
        return verify('3ND_DOCUMENT_HASH', bob).then(() => {
          return verifiersFor('3ND_DOCUMENT_HASH').then((verifiers) => {
            assert.equal(verifiers.length, 1);
          });
        });
      });
    });
  });

  it('is not possible to verify an unsubmitted report', (done) => {
    verify('5ND_DOCUMENT_HASH', alice)
      .catch(() => {
        assert.ok(true);
        done();
      }).then(() => {
        assert.fail();
        done();
      });
  });
});
