var Membership = artifacts.require("./Membership.sol")
var Verification = artifacts.require("./Verification.sol")

module.exports = function(deployer) {
  deployer.deploy(Membership);
  deployer.deploy(Verification);
};
