contract('Verification', function(accounts) {
  var contract;
  var alice = accounts[0];
  var bob = accounts[1];
  var carol = accounts[2];

  function verify(reportId, account) {
    return contract.verify(reportId, {from: account});
  }

  function isValid(reportId) {
    return contract.isValid.call(reportId);
  }

  function verifiersFor(reportId) {
    return contract.verifiersFor.call(reportId);
  }

  beforeEach(function() {
    contract = Verification.deployed();
  });

  it('allows users to verify documents', function() {
    return verify('DOCUMENT_HASH', alice).then(function() {
      return verifiersFor('DOCUMENT_HASH').then(function(verifiers) {
        assert.sameDeepMembers(verifiers, [alice]);
      });
    })
  });

  it('lists a document as valid after three verifications', function() {
    return verify('2ND_DOCUMENT_HASH', alice).then(function() {
      return verify('2ND_DOCUMENT_HASH', bob).then(function() {
        return verify('2ND_DOCUMENT_HASH', carol).then(function() {
          return isValid('2ND_DOCUMENT_HASH').then(function(contractIsValid) {
            assert.isTrue(contractIsValid);
          })
        });
      });
    });
  });
});
