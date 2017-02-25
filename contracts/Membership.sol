pragma solidity ^0.4.2;

contract Membership {
  mapping (address => bool) members;

  function isMember(address _address) constant returns (bool isMember) {
    return members[_address];
  }
}
