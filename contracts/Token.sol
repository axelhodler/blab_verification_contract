pragma solidity ^0.4.8;

contract Token {
  address public owner;
  mapping (address => uint) balances;

  function Token() {
    owner = msg.sender;
    balances[owner] = 100000;
  }

  function sendCoin(address receiver, uint amount) returns(bool sufficient) {
    if (balances[msg.sender] < amount) return false;
      balances[msg.sender] -= amount;
      balances[receiver] += amount;
      return true;
  }

  function getBalance(address addr) constant returns(uint) {
    return balances[addr];
  }

}