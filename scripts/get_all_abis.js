var solc = require('solc')
var fs = require('fs')

var membershipContract = fs.readFileSync('contracts/Membership.sol').toString()
var verificationContract = fs.readFileSync('contracts/Verification.sol').toString()
var tokenContract = fs.readFileSync('contracts/Token.sol').toString()

var input = {
  'Token.sol': tokenContract,
  'Membership.sol': membershipContract,
  'Verification.sol': verificationContract
}

var compiled = solc.compile({sources: input}, 1)

for (var contractName in compiled.contracts) {
  console.log(contractName + " ABI:")
  console.log(compiled.contracts[contractName].interface);
  console.log("")
}
