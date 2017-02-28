var token = artifacts.require('./Token.sol')

contract('token', function(accounts) {
  let tokenContract;

  beforeEach(() => {
    return token.deployed().then(instance => {
      tokenContract = instance;
    })
  })

  it('puts 100000 Tokens into the first account', function() {
    return tokenContract.getBalance.call(accounts[0]).then(balance => {
      assert.equal(balance.valueOf(), 100000, '100000 was not in the first account')
    })
  })

  it('sends coin correctly', function() {
    let meta = tokenContract;

    var account_one = accounts[0]
    var account_two = accounts[1]

    var account_one_starting_balance
    var account_two_starting_balance
    var account_one_ending_balance
    var account_two_ending_balance

    var amount = 10

    return meta.getBalance.call(account_one).then(function(balance) {
      account_one_starting_balance = balance.toNumber()
      return meta.getBalance.call(account_two)
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber()
      return meta.sendCoin(account_two, amount, {from: account_one})
    }).then(function() {
      return meta.getBalance.call(account_one)
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber()
      return meta.getBalance.call(account_two)
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber()

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, 'Amount wasn not correctly taken from the sender')
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, 'Amount wasn not correctly sent to the receiver')
    })
  })
})
