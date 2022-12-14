import Web3 from "web3";

export const getWeb3 = (rpc: any) => new Web3(rpc);

export const getContract = (provider: any, abi: any, address: string) => {
  const web3 = getWeb3(provider);
  return new web3.eth.Contract(abi, address);
};

module.exports = {
  getWeb3,
  getContract,
};
