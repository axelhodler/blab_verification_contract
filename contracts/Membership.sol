pragma solidity ^0.4.8;

contract Membership {
  mapping (address => bool) members;
  address public manager;

  function Membership(address _manager) {
    manager = _manager;
    members[manager] = true;
  }

  function addMember(address _member) {
    if (msg.sender == manager) members[_member] = true;
  }

  function isMember(address _address) constant returns (bool isMember) {
    return members[_address];
  }
}
