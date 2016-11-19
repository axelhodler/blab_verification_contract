var solc = require('solc');
var fs = require('fs');

var getAbi = function(err, data) {
  if (err) throw err;
  var output = solc.compile(data, 1);

  for (var contractName in output.contracts) {
    console.log(output.contracts[contractName].interface);
  }
}
fs.readFile('contracts/Verification.sol', 'utf8', getAbi);
