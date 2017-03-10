const Web3 = require('web3')
const solc = require('solc')
const fs = require('fs')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

var membershipContract = fs.readFileSync('contracts/Membership.sol').toString()
var verificationContract = fs.readFileSync('contracts/Verification.sol').toString()
var tokenContract = fs.readFileSync('contracts/Token.sol').toString()

var input = {
  'Token.sol': tokenContract,
  'Membership.sol': membershipContract,
  'Verification.sol': verificationContract
}

var compiled = solc.compile({sources: input}, 1);

verificationContract = compiled.contracts.Verification

const Verification = web3.eth.contract(JSON.parse(verificationContract.interface))
Verification.new({
  data: verificationContract.bytecode,
  from: web3.eth.accounts[0],
  gas: 1250000
}, (err, contract) => {
  if (!err) {
    if (!contract.address) {
      console.log('txhash:\t' + contract.transactionHash)
    } else { // second callback
      console.log('contract address:\t' + contract.address)
    }
  }
})

