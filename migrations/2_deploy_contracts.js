var Membership = artifacts.require("./Membership.sol")
var Verification = artifacts.require("./Verification.sol")
var Token = artifacts.require("./Token.sol")

module.exports = function(deployer) {
  return deployer.deploy(Membership).then(() => {
    return Membership.deployed()
  }).then(instance => {
    return instance.address;
  }).then(membershipContractAddress => {
    return deployer.deploy(Verification, membershipContractAddress)
  }).then(() => {
    return deployer.deploy(Token)
  })
}
