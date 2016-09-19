window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    document.getElementById('coinbase').innerHTML = accs[0];
    var contract = 'var contract = web3.eth.contract(' + JSON.stringify(Verification.deployed().abi) + ').at("' + Verification.deployed().address + '");';
    document.getElementById('contract').value = contract;

    document.getElementById('verify').value = 'contract.verify("iShouldBeAHash", function() {});';
    document.getElementById('validate').value = 'contract.isValid.call("iShouldBeAHash", function() { console.log(arguments[1]) });'
  });
};
