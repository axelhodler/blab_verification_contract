pragma solidity ^0.4.8;

import "./Membership.sol";

contract Verification {
  mapping (string => Report) reports;
  Membership membership;

  struct Report {
    address submitter;
    mapping (address => bool) hasValidated;
    address[] validators;
    bool isValid;
  }

  modifier onlyByMember() {
    if (!membership.isMember(msg.sender)) throw;
    _;
  }

  function Verification(address membershipContractAddress) {
    membership = Membership(membershipContractAddress);
  }

  function submit(string reportId) onlyByMember {
    if (reports[reportId].submitter != address(0)) throw;
    Report r = reports[reportId];
    r.submitter = msg.sender;
  }

  function verify(string reportId) {
    Report r = reports[reportId];
    if (r.submitter == address(0)) throw;
    if(!r.isValid && !r.hasValidated[msg.sender]) {
      r.hasValidated[msg.sender] = true;
      r.validators.push(msg.sender);
    }
    if(r.validators.length == 2) {
      r.isValid = true;
    }
  }

  function isValid(string reportId) constant returns(bool isValid) {
    return reports[reportId].isValid;
  }

  function submitterFor(string reportId) constant returns(address submitter) {
    return reports[reportId].submitter;
  }

  function verifiersFor(string reportId) constant returns(address[] addresses) {
    return reports[reportId].validators;
  }
}
