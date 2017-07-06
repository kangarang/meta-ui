const HumanStandardToken = artifacts.require('HumanStandardToken')

// uint256 _initialAmount,
// string _tokenName,
// uint8 _decimalUnits,
// string _tokenSymbol

module.exports = deployer => {
    deployer.deploy(HumanStandardToken, 10000, "KangCoin", 8, "KNG")
}
