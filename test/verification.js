contract('Verification', (accounts) => {
  let contract;
  let alice = accounts[0];
  let bob = accounts[1];
  let carol = accounts[2];

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
    contract = Verification.deployed();
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

    it('is not allowed to submit the same report twice', (done) => {
      return submit(report, alice).catch(() => {
        assert.ok(true);
        done();
      }).then(() => {
        assert.fail();
        done();
      });
    });
  });

  it('allows users to verify documents', () => {
    return verify('DOCUMENT_HASH', alice).then(() => {
      return verifiersFor('DOCUMENT_HASH').then((verifiers) => {
        assert.equal(verifiers.length, 1);
        assert.sameDeepMembers(verifiers, [alice]);
      });
    })
  });

  it('lists a document as valid after three verifications', () => {
    return verify('2ND_DOCUMENT_HASH', alice).then(() => {
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
    return verify('3ND_DOCUMENT_HASH', alice).then(() => {
      return verify('3ND_DOCUMENT_HASH', alice).then(() => {
        return verifiersFor('3ND_DOCUMENT_HASH').then((verifiers) => {
          assert.equal(verifiers.length, 1);
        });
      });
    });
  });

  it('is not valid if the same person verifies it three times', () => {
    return verify('4ND_DOCUMENT_HASH', alice).then(() => {
      return verify('4ND_DOCUMENT_HASH', alice).then(() => {
        return verify('4ND_DOCUMENT_HASH', alice).then(() => {
          return isValid('4ND_DOCUMENT_HASH').then((contractIsValid) => {
            assert.isNotTrue(contractIsValid);
          })
        });
      });
    });
  });
});
