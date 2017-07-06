const KangCoin = artifacts.require('HumanStandardToken')

contract('KangCoin', function(accounts) {
    let kangCoin

    it('should deploy KangCoin and get the address, name, and symbol', () => {
        return KangCoin.deployed()
            .then(instance => {
                kangCoin = instance
                assert.notEqual(kangCoin.address, null)
                return kangCoin.name()
            })
            .then(name => {
                assert.equal(typeof name, 'string')
                return kangCoin.symbol()
            })
            .then(symbol => {
                assert.equal(typeof symbol, 'string')
            })
    })

    it('should put 10000 KangCoin in the first account', function() {
        return KangCoin.deployed()
            .then(function(instance) {
                return instance.balanceOf.call(accounts[0])
            })
            .then(function(balance) {
                assert.equal(
                    balance.valueOf(),
                    10000,
                    "10000 wasn't in the first account"
                )
            })
    })

    it('should send some coins correctly', function() {
        let kang

        // Get initial balances of first and second account.
        let account_one = accounts[0]
        let account_two = accounts[1]

        let account_one_starting_balance
        let account_two_starting_balance
        let account_one_ending_balance
        let account_two_ending_balance

        let amount = 10

        return KangCoin.deployed()
            .then(function(instance) {
                kang = instance
                return kang.balanceOf.call(account_one)
            })
            .then(function(balance) {
                account_one_starting_balance = balance.toNumber()
                return kang.balanceOf.call(account_two)
            })
            .then(function(balance) {
                account_two_starting_balance = balance.toNumber()
                return kang.transfer(account_two, amount, { from: account_one })
            })
            .then(function() {
                return kang.balanceOf.call(account_one)
            })
            .then(function(balance) {
                account_one_ending_balance = balance.toNumber()
                return kang.balanceOf.call(account_two)
            })
            .then(function(balance) {
                account_two_ending_balance = balance.toNumber()

                assert.equal(
                    account_one_ending_balance,
                    account_one_starting_balance - amount,
                    "Amount wasn't correctly taken from the sender"
                )
                assert.equal(
                    account_two_ending_balance,
                    account_two_starting_balance + amount,
                    "Amount wasn't correctly sent to the receiver"
                )
            })
    })

    it('should send 1 ETH and 5000 KNG from account 0 -> account 9', () => {
        let ether = 1 * Math.pow(10, 18)
        let kngSendAmount = 5000
        let sendObj = {
            from: accounts[0],
            value: ether,
            to: accounts[9]
        }

        Promise.resolve(web3.eth.sendTransaction(sendObj))
            .then(txHash => {
                assert.notEqual(txHash, null, 'transaction failed')
                return web3.eth.getBalance(accounts[0])
            })
            .then(balance => {
                assert.notEqual(balance.toNumber(), 0, 'balance is zero')
                return kangCoin.transfer.sendTransaction(
                    accounts[9],
                    kngSendAmount,
                    { from: accounts[0] }
                )
            })
            .then(txHash => {
                assert.notEqual(txHash, null, 'transaction failed')
                return kangCoin.balanceOf.call(accounts[9])
            })
            .then(nineBalance => assert.equal(nineBalance.toNumber(), 5000, 'account 9 balance is not 5000'))
    })
})
