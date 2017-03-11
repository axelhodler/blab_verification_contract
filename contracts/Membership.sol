pragma solidity ^0.4.8;

contract Membership {
  mapping (address => bool) members;

  function Membership() {
    members[0x38588822bea476d5e1d56cfc9ce9781fe5262196] = true;
    members[0xdf700fd0413ca5772cbf5a588d3080469f2edda2] = true;
    members[0x354990de9386772900c6b257ec0b8dcc5af8bfba] = true;
  }

  function isMember(address _address) constant returns (bool isMember) {
    return members[_address];
  }
}
