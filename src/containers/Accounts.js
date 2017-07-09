import React, { Component } from 'react'
import contract from 'truffle-contract'
import Tx from 'ethereumjs-tx'

import Account from '../components/Account'
import privateKeys from '../private-keys.json'
import json from '../contracts/HumanStandardToken.json'
import ballotJSON from '../contracts/Ballot.json'

const Web3 = require('web3')
const web3 = new Web3()
const provider = new web3.providers.HttpProvider('http://localhost:8545')

// creates an abstraction layer to interface with the contract
const KangCoin = contract(json)
const Ballot = contract(ballotJSON)

// imports keys from private-keys.json
const pKeys = Object.values(privateKeys.keys)

KangCoin.setProvider(provider)
Ballot.setProvider(provider)
web3.setProvider(provider)

console.log(web3)

const styles = {
    container: {
        display: 'flex',
        flexFlow: 'row wrap'
    }
}

class Accounts extends Component {
    constructor() {
        super()
        this.state = {
            accounts: web3.eth.accounts,
            amount: '',
            to: '',
            copied: false,
            kangBalances: []
        }
    }

    componentDidMount() {
        this.getKangBalances()
    }

    refresh = () => {
        this.setState({
            accounts: web3.eth.accounts,
            kangBalances: this.getKangBalances()
        })
    }

    handleSetAmount = e => {
        this.setState({
            amount: e.target.value,
            copied: false
        })
    }

    handleSetTo = e => {
        this.setState({
            to: e.target.value,
            copied: false
        })
    }

    getBalance = acct => {
        return web3.fromWei(web3.eth.getBalance(acct), 'ether').toNumber()
    }

    getKangBalances = () => {

        return KangCoin.deployed()
            .then(instance => {
                return Promise.all(
                    web3.eth.accounts.map(act => instance.balanceOf.call(act))
                )
            })
            .then(balances => {
                console.log(balances)
                return balances.map(one => one.toNumber())
            })
            .then(numbers => {
                console.log(numbers)
                this.setState({ kangBalances: numbers })
            })
            .catch(error => {
                console.log('Error:', error)
            })
    }

    handleCopy = () => {
        this.setState({
            copied: true
        })
    }

    approveTransaction = () => {
        
    }

    handleSendKangCoin = (fromAccount, ind) => {
        let kangCoin
        return KangCoin.deployed()
            .then(deployed => {
                console.log(deployed)
                kangCoin = deployed
                return kangCoin.balanceOf.call(fromAccount)
            })
            .then(balance => {
                console.log(`Account ${ind} balance:`, balance.toNumber())
                return kangCoin.transfer.sendTransaction(this.state.to, this.state.amount, {from: fromAccount})
            })
            .then(result => {
                console.log(result)
                return kangCoin.balanceOf.call(fromAccount)
            })
            .then(bal => {
                console.log(`Account ${ind} balance:`, bal.toNumber())
                this.refresh()
            })
            .catch(error => {
                console.log('Error:', error)
            })
    }

    handleSendRawEth = (e, ind, account) => {
        e.preventDefault()

        let pKeyFrom = pKeys[ind || 0]

        let addressFrom = account
        let addressTo = this.state.to

        let privateKey = new Buffer(pKeyFrom, 'hex')

        let rawTx = {
            from: addressFrom,
            to: addressTo,
            gasPrice: web3.toHex(20000000000),
            gasLimit: web3.toHex(21000),
            value: web3.toHex(
                web3.toWei(parseInt(this.state.amount || 7, 0), 'ether')
            ),
            data: '',
            nonce: web3.toHex(web3.eth.getTransactionCount(addressFrom))
        }

        // ethereum-tx
        let tx = new Tx(rawTx)
        // sign txn with private key
        tx.sign(privateKey)
        // create a serialized txn
        let serializedTx = tx.serialize().toString('hex')
        // send raw txn
        let txHash = web3.eth.sendRawTransaction(serializedTx)

        console.log('txHash:', web3.eth.getTransaction(txHash))

        this.refresh()
    }

    handleVote = (addressFrom) => {
        let addressTo = web3.eth.accounts.indexOf(this.state.to)
        let ballot
        return Ballot.deployed()
            .then(deployed => {
                console.log(deployed);
                ballot = deployed
                return ballot.vote.sendTransaction(addressTo, {from: addressFrom})
            })
            .then(res => {
                console.log("res:", res);
            })
    }

    render() {
        return (
            <div style={styles.container}>
                {web3.eth.accounts.map((act, ind) =>
                    <Account
                        key={ind}
                        ind={ind}
                        setTo={this.handleSetTo}
                        account={act}
                        balance={this.getBalance}
                        kangBalance={this.state.kangBalances[ind]}
                        send={this.handleSendRawEth}
                        setAmount={this.handleSetAmount}
                        copy={this.handleCopy}
                        sendKang={this.handleSendKangCoin}
                        vote={this.handleVote}
                    />
                )}
            </div>
        )
    }
}

export default Accounts
