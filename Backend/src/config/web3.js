const Web3 = require("web3");

const getWeb3 = (rpc) => new Web3(rpc);

const getContract = (provider, abi, address) => {
  const web3 = getWeb3(provider);
  return new web3.eth.Contract(abi, address);
};

module.exports = {
  getWeb3,
  getContract,
};
