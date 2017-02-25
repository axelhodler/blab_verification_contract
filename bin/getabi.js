var solc = require('solc')
var fs = require('fs')

var contract = fs.readFileSync('contracts/Verification.sol').toString()
var compiled = solc.compile(contract, 1);

for (var contractName in compiled.contracts) {
  console.log(compiled.contracts[contractName].interface);
}

