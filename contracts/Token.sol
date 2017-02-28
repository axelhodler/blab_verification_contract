pragma solidity ^0.4.2;

contract Token {
	mapping (address => uint) balances;

	function Token() {
		balances[tx.origin] = 100000;
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

	function () { throw; }
}