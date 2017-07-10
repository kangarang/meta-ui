Meta-UI
=======

### Isaac Kang | ConsenSys dev applicant | July 6, 2017

Overview / Process
------------------

At first I wanted to create an ethereum arcade where users could play different games against each other and use their "ticket winnings" to purchase prizes from a user-voted "prize counter".

However, experimenting with token transfers proved to be difficult:
- Testing with [MetaMask](https://github.com/MetaMask) was problematic because I had to reset `testrpc`, `truffle`, and the browser itself each time I made a mistake, and then import new accounts and reference the token again.
- Copy/pasta-ing private keys from the terminal was frustrating, and sometimes I would hit `ctrl-c` instead of `ctrl-shift-c`, restarting the process.

At that point I realized there definitely wasn't enough time to make the arcade, but I wanted to explore the dev tools deeper to create an easy-to-use [user interface](https://github.com/kangarang/meta-ui) which would:
1. Create a json file with all private keys
2. Automatically have an abstraction reference to the deployed token
3. Send ETH or KNG (token) between the 10 testrpc accounts

Took a look at [eth-lightwallet](https://github.com/ConsenSys/eth-lightwallet), which seemed very robust, but I knew I didn't have enough time for a deep dive.

So I modified `testrpc` to create a `private-keys.json` so it could be used by the UI. Felt brave enough to make [Pull request #342](https://github.com/ethereumjs/testrpc/pull/342).

I remembered Mike Goldin mentioning that **testing** is a crucial part in developing dApps, so I made a couple of my own after taking a look at his [AdChain tests](https://github.com/AdChain/token-launch-contracts), the stock [truffle tests](https://github.com/trufflesuite/truffle), and Alex Miller's [eth-dev-101 tests](https://github.com/alex-miller-0/eth-dev-101)

I must admit...I went over the 3 hour mark. But it was only because I was having so much fun!

---

Token (KangCoin / KNG)
----------------------

`HumanStandardToken.sol` from [ConsenSys Tokens](https://github.com/ConsenSys/Tokens)

---

Start
-----

    $ git clone git@github.com:kangarang/meta-ui.git
    $ cd meta-ui
    $ npm install
    $ npm run testrpc

- Note: `npm run testrpc` only works on the modified `testrpc`. Instructions can be found in `/modified-testrpc.md`

#### Open new terminal

    $ npm run migrate
    $ npm start

---

Testing
-------

Execute truffle tests in `/truffle/test` and mocha tests in `/test`

    $ npm run test

Execute external truffle script `/truffle/scripts/external.js`

    $ npm run external

---

Scripts
-------

```json
{
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "cd truffle && truffle deploy && truffle test && cd .. && mocha test/test.js",
    "eject": "react-scripts eject",
    "external": "cd truffle && truffle exec scripts/external.js",
    "migrate": "cd truffle && rm -rf build && truffle migrate && cp build/contracts/* ../src/contracts",
    "testrpc": "cd src && rm -rf contracts && mkdir contracts && testrpci"
}
```

---

Tools & Credits
---------------

- [create-react-app](https://github.com/facebookincubator/create-react-app) -- react.js boilerplate
- [testrpc](https://github.com/ethereumjs/testrpc) -- local ethereum blockchain server
- [truffle](https://github.com/trufflesuite/truffle) -- smart contract compilation, linking, and deployment
- [web3.js](https://github.com/ethereum/web3.js/) -- communicate with smart contracts
- [mocha.js](https://github.com/mochajs/mocha) -- testing contracts

https://learnxinyminutes.com/docs/solidity/

http://consensys.github.io/developers/articles/101-noob-intro/

https://hackernoon.com/getting-started-as-an-ethereum-web-developer-9a2a4ab47baf

https://medium.com/metamask/developing-ethereum-dapps-with-truffle-and-metamask-aa8ad7e363ba

https://github.com/AdChain/token-launch-contracts

https://github.com/alex-miller-0/eth-dev-101

https://github.com/ConsenSys/Tokens

https://github.com/ConsenSys/smart-contract-best-practices

https://solidity.readthedocs.io/en/develop/common-patterns.html

https://www.reddit.com/r/ethdev/comments/5s9avy/the_big_ethereum_development_resources_list/

https://media.consensys.net/time-sure-does-fly-ed4518792679

https://medium.com/blockchannel/tools-and-technologies-in-the-ethereum-ecosystem-e5b7e5060eb9

https://medium.com/zeppelin-blog/the-hitchhikers-guide-to-smart-contracts-in-ethereum-848f08001f05

https://hackernoon.com/a-note-on-numbers-in-ethereum-and-javascript-3e6ac3b2fad9

http://vessenes.com/the-erc20-short-address-attack-explained/

https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2

