pragma solidity ^0.4.8;

import "./Membership.sol";
import "./Token.sol";

contract Verification {
  mapping (string => Report) reports;
  Membership public membership;
  Token public token;

  struct Report {
    address submitter;
    mapping (address => bool) hasValidated;
    uint compensation;
    address[] validators;
    bool isValid;
  }

  modifier onlyByMember() {
    if (!membership.isMember(msg.sender)) throw;
    _;
  }

  function Verification(address membershipContractAddress, address tokenContractAddress) {
    membership = Membership(membershipContractAddress);
    token = Token(tokenContractAddress);
  }

  function submit(string reportId, uint compensation) onlyByMember {
    if (reports[reportId].submitter != address(0)) throw;
    Report r = reports[reportId];
    r.submitter = msg.sender;
    r.compensation = compensation;
  }

  function verify(string reportId) onlyByMember {
    Report r = reports[reportId];
    if (r.submitter == address(0)) throw;
    if(!r.isValid && !r.hasValidated[msg.sender]) {
      r.hasValidated[msg.sender] = true;
      r.validators.push(msg.sender);
    }
    if(r.validators.length == 2) {
      r.isValid = true;
      token.sendCoin(r.submitter, r.compensation);
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
