contract('Verification', (accounts) => {
  var contract;
  var alice = accounts[0];
  var bob = accounts[1];
  var carol = accounts[2];

  var verify = (reportId, account) => {
    return contract.verify(reportId, {from: account});
  };

  var isValid = (reportId) => {
    return contract.isValid.call(reportId);
  };

  var verifiersFor = (reportId) => {
    return contract.verifiersFor.call(reportId);
  };

  beforeEach(() => {
    contract = Verification.deployed();
  });

  describe('submitting a report', () => {
    it('sets the submitter in the report', () => {
      const report = 'DOCUMENT_HASH_0';
      return contract.submit(report, {from: alice}).then(() => {
        return contract.submitterFor.call(report).then((submitter) => {
          assert.equal(submitter, alice);
        })
      })
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
