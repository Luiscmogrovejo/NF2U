import Web3 from "web3";
import mergeImages from "merge-images";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ERC721 } from "../abis/ERC721abi";
require("dotenv").config();
const axios = require("axios").default;


const createNft = async (collectionId) => {
    const projectId = process.env.NEXT_PUBLIC_PROJECT_ID_INFURA;
    const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET_INFURA;

    const auth =
        'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
    const client = ipfsHttpClient({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    });
  
    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const contract = new web3.eth.Contract(ERC721, collectionId);
    const addedImage = await client.add(image);
    const name = `Collection Name`;
    const description = "Description";
  
    const external_url = "url"
  
    const snarkyData = JSON.stringify({

          data1,
          data2,
          data3,
          data4

      });

    const data = JSON.stringify({
      name,
      description,
      external_url,
      id,
      attributes: {
        snarkyData
      },
      image: addedImage.path,
    });
  
    const added2 = await client.add(data);
    
    try {
      const upgrade = await contract.methods.upgradeStage(id, added2.path).send({ from: account });
      return true;
    } catch(error){
      return false;
    }
}

module.exports = createNft;

