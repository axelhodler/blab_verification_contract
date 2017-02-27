var solc = require('solc')
var fs = require('fs')

var membershipContract = fs.readFileSync('contracts/Membership.sol').toString()
var verificationContract = fs.readFileSync('contracts/Verification.sol').toString()

var input = {
  'Membership.sol': membershipContract,
  'Verification.sol': verificationContract
}

var compiled = solc.compile({sources: input}, 1);

for (var contractName in compiled.contracts) {
  if (contractName === 'Verification')
    console.log(compiled.contracts[contractName].interface);
}

