pragma solidity ^0.4.2;

contract Verification {
  mapping (string => Report) reports;

  struct Report {
    mapping (address => bool) hasValidated;
    address[] validators;
    bool isValid;
  }

  function verify(string reportId) {
    Report r = reports[reportId];
    if(!r.isValid && !r.hasValidated[msg.sender]) {
      r.hasValidated[msg.sender] = true;
      r.validators.push(msg.sender);
    }
    if(r.validators.length == 3) {
      r.isValid = true;
    }
  }

  function isValid(string reportId) constant returns(bool isValid) {
    return reports[reportId].isValid;
  }

  function verifiersFor(string reportId) constant returns(address[] addresses) {
    return reports[reportId].validators;
  }
}
