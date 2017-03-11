var Membership = artifacts.require("./Membership.sol")
var Verification = artifacts.require("./Verification.sol")
var Token = artifacts.require("./Token.sol")

module.exports = function(deployer) {
  const membershipManager = web3.eth.accounts[0]
  return deployer.deploy(Membership, membershipManager).then(() => {
    return deployer.deploy(Verification, membershipManager)
  }).then(() => {
    return deployer.deploy(Token)
  })
}
