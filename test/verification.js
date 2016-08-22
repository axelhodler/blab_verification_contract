contract('Verification', function(accounts) {
  var contract;
  var alice = accounts[0];
  var bob = accounts[1];
  var carol = accounts[2];

  beforeEach(function() {
    contract = Verification.deployed();
  });

  it('allows users to verify documents', function() {
    return contract.verify('DOCUMENT_HASH', {from: alice}).then(function() {
      return contract.verifiersFor.call('DOCUMENT_HASH').then(function(verifiers) {
        assert.sameDeepMembers(verifiers, [alice]);
      });
    })
  });

  it('lists a document as valid after three verifications', function() {
    return contract.verify('2ND_DOCUMENT_HASH', {from: alice}).then(function() {
      return contract.verify('2ND_DOCUMENT_HASH', {from: bob}).then(function() {
        return contract.verify('2ND_DOCUMENT_HASH', {from: carol}).then(function() {
          return contract.isValid.call('2ND_DOCUMENT_HASH').then(function(contractIsValid) {
            assert.isTrue(contractIsValid);
          })
        });
      });
    });
  });
});
