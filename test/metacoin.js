contract('Verification', function(accounts) {
  it('', function() {
    var meta = Verification.deployed();

    return meta.verify('foo', {from: accounts[0]}).then(function() {
      return meta.verifiersFor.call('foo').then(function(verifiers) {
        assert.sameDeepMembers(verifiers, [accounts[0]]);
      });
    })
  });
});
