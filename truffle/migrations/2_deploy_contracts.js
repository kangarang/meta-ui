const HumanStandardToken = artifacts.require('HumanStandardToken')
const Ballot = artifacts.require('Ballot')

// KangCoin params
// uint256 _initialAmount,
// string _tokenName,
// uint8 _decimalUnits,
// string _tokenSymbol

// ballot params
// address[] _proposalNames
module.exports = (deployer, network, accounts) => {
    return deployer.deploy(
        HumanStandardToken, 10000, 'KangCoin', 8, 'KNG'
    )
    .then(() => HumanStandardToken.deployed())
    .then(kng => {
        // console.log('kng:', kng);
        return deployer.deploy(Ballot, accounts)
    })
    .then(() => Ballot.deployed())
    .then(blt => {
        // console.log('blt.voters:', blt.voters);
        // console.log('blt.proposals:', blt.proposals);
        return blt
    })
}
