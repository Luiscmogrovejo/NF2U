var Web3 = require('web3');
require("dotenv").config();
const axios = require("axios").default;

const createCollection = async (req, res) => {
    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const contract = new web3.eth.Contract(ERC721, collectionId);
}

module.exports = createCollection;