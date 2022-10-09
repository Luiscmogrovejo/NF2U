require("dotenv").config();
const axios = require("axios");
const { provider_list, contracts_addresses } = require("../config/providers");
const ERC721 = require("../abis/ERC721Abi.json");
const { getWeb3, getContract } = require("../config/web3");

const createCollection = async (req, res) => {
  const { chainId } = req.body;
  const RPC_URL = provider_list[chainId];
  const contractAddress = contracts_addresses[chainId];

  const provider = getWeb3(RPC_URL);
  const contract = getContract(provider, ERC721, contractAddress);
  const newCollection = await contract.methods._mintNewNFT().send()
  return newCollection;

}

module.exports = createCollection;