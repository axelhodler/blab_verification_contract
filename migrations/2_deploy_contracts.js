var Membership = artifacts.require("./Membership.sol")
var Verification = artifacts.require("./Verification.sol")
var Token = artifacts.require("./Token.sol")

module.exports = function(deployer) {
  return deployer.deploy(Membership).then(() => {
    return deployer.deploy(Verification)
  }).then(() => {
    return deployer.deploy(Token)
  })
}
