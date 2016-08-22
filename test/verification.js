contract('Verification', function(accounts) {
  var contract;

  beforeEach(function() {
    contract = Verification.deployed();
  });

  it('allows users to verify documents', function() {
    return contract.verify('DOCUMENT_HASH', {from: accounts[0]}).then(function() {
      return contract.verifiersFor.call('DOCUMENT_HASH').then(function(verifiers) {
        assert.sameDeepMembers(verifiers, [accounts[0]]);
      });
    })
  });
});
