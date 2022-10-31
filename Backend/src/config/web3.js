const Web3 = require("web3");

const getWeb3 = (/** @type {any} */ rpc) => new Web3(rpc);

const getContract = (/** @type {any} */ provider, /** @type {any} */ abi, /** @type {any} */ address) => {
  const web3 = getWeb3(provider);
  return new web3.eth.Contract(abi, address);
};

module.exports = {
  getWeb3,
  getContract,
};
