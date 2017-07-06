var web3 = require('web3');
var _web3 = new web3();
_web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
exports.web3 = _web3;
