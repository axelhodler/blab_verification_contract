const fs = require('fs')

const VERIFICATION = require('./../build/contracts/Verification')
const TOKEN = require('./../build/contracts/Token')

const networkId = Object.keys(VERIFICATION.networks)[0]

const verificationAddress = VERIFICATION.networks[networkId].address
const verificationAbi = JSON.stringify(VERIFICATION.abi)

const tokenAddress = TOKEN.networks[networkId].address
const tokenAbi = JSON.stringify(TOKEN.abi)

console.log(verificationAddress)
console.log(verificationAbi)
console.log(tokenAddress)
console.log(tokenAbi)
