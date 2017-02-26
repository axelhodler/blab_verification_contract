var Membership = artifacts.require("./Membership.sol")
var Verification = artifacts.require("./Verification.sol")

module.exports = function(deployer) {
  return deployer.deploy(Membership).then(() => {
    return Membership.deployed()
  }).then(instance => {
    return instance.address;
  }).then(membershipContractAddress => {
    return deployer.deploy(Verification, membershipContractAddress)
  })
};
