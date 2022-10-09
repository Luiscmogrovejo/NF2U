require("dotenv").config();
const axios = require("axios");
const { provider_list, contracts_addresses } = require("../config/providers");
const ERC721 = require("../abis/ERC721Abi.json");
const { getWeb3, getContract } = require("../config/web3");

const createNft = async (times, image, req, res) => {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID_INFURA;
  const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET_INFURA;

  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const client = ipfsHttpClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  const { chainId } = req.body;

  const RPC_URL = provider_list[chainId];
  const contractAddress = contracts_addresses[chainId];

  const provider = getWeb3(RPC_URL);
  const contract = getContract(provider, ERC721, contractAddress);
  for (i =0; i<times;i++) {
    const tokenId = await contract.methods.safeMint().send()
    const addedImage = await client.add(image);
    const name = `Collection Name`;
    const description = "Description";
  
    const external_url = "url";
  
    const data = JSON.stringify({
      name,
      description,
      external_url,
      id,
      attributes: {
        snarkyData,
      },
      image: addedImage.path,
    });
    
    const added2 = await client.add(data);
    await contract.methods.setTokenURI(tokenId, added2.path).send()
  
  }

};

module.exports = createNft;
