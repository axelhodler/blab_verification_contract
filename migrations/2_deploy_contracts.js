var Membership = artifacts.require("./Membership.sol")
var Verification = artifacts.require("./Verification.sol")
var Token = artifacts.require("./Token.sol")

module.exports = function(deployer) {
  let membershipContractAddress
  return deployer.deploy(Membership).then(() => {
    return Membership.deployed()
  }).then(instance => {
    return instance.address
  }).then(address => {
    membershipContractAddress = address
    return deployer.deploy(Token)
  }).then(() => {
    return Token.deployed()
  }).then(tokenContract => {
    return deployer.deploy(Verification, membershipContractAddress, tokenContract.address)
  })
}
