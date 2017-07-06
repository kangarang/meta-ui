const Web3 = require('web3')
const privateKeys = require('../src/private-keys.json')
const Tx = require('ethereumjs-tx')
const assert = require('chai').assert

const web3 = new Web3()
const provider = new web3.providers.HttpProvider('http://localhost:8545')
web3.setProvider(provider)

const keys = Object.values(privateKeys.keys)

describe('UI Test', done => {
    // it('Should hit up the blockchain and give me KNG balance of account 9', done => {

        // const acctNine = web3.eth.accounts[9]

        // const bal = web3.eth.call({to: acctNine})

        // asset.equal(parseInt(bal), 5000)
        // done()
    // })

    it('Should send a raw txn to the blockchain that moves eth from account 0 -> account 5', done => {
        assert.notEqual(
            keys,
            null,
            'You havent create a private-keys.json file in the /src directory. try: npm run migrate'
        )

        let privateKey = new Buffer(keys['0'], 'hex')

        let rawTx = {
            from: web3.eth.accounts[0],
            to: web3.eth.accounts[5],
            gasPrice: web3.toHex(20000000000),
            gas: web3.toHex(21000),
            value: web3.toHex(
                web3.toWei(parseInt(2, 0), 'ether')
            ),
            data: '',
            nonce: web3.toHex(web3.eth.getTransactionCount(web3.eth.accounts[0]))
        }

        let tx = new Tx(rawTx)
        tx.sign(privateKey)
        let serializedTx = tx.serialize().toString('hex')
        let txHash = web3.eth.sendRawTransaction(serializedTx)

        assert.notEqual(txHash, null, 'transaction failed')

        done()
    })
})
