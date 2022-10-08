var Web3 = require('web3');
require("dotenv").config();
const axios = require("axios").default;

const createCollection = async (req, res) => {
  const collectionId = "0x8638BF6B932764Db8C81ECBAA92f36BcAf369cDc";
    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const contract = new web3.eth.Contract([
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_cost",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "_vault",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "symbol",
            "type": "string"
          }
        ],
        "name": "_mintNewNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      }
    ], collectionId);
    const newCollection = await contract.methods.safeMint().send()
    return newCollection;

}

module.exports = createCollection;