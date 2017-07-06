const Kangcoin = artifacts.require('HumanStandardToken')
const Tx = require('ethereumjs-tx')

const web3 = require('../../config.js').web3

const privateKeys = require('../../src/private-keys.json')

const pKey1 = privateKeys.keys['0']

let kang
let acctTwo = web3.eth.accounts[1]

console.log(acctTwo);

module.exports = callback => {
    Kangcoin.deployed()
        .then(instance => {
            kang = instance
            return kang.transfer(acctTwo, 2)
        })
        .then(result => {
            console.log(result);
            console.log('transaction successful')
        })
        .catch(error => {
            console.log('Error:', error)
        })
    callback()
}
