var Web3 = require('web3');
require("dotenv").config();
const axios = require("axios").default;

const createCollection = async (userWallet) => {
  const collectionId = "0x8638BF6B932764Db8C81ECBAA92f36BcAf369cDc";
    const web3 = new Web3("https://attentive-ancient-spring.matic-testnet.discover.quiknode.pro/ffd31463498f334a11f8583f94c9e030e0b82c90/");
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
    ], collectionId, {from: userWallet});
    const newCollection = await contract.methods._mintNewNFT().send()
    return newCollection;

}

module.exports = createCollection;