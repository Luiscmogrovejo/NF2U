require("dotenv").config();
const axios = require("axios");
const { provider_list, contracts_addresses } = require("../config/providers");
const ERC721 = require("../abis/ERC721Abi.json");
const { getWeb3, getContract } = require("../config/web3");

const createNft = async (times, image, contractAddress, req, res) => {
  const { chainId, email } = req.body;
  if (!chainId) {
    return res.statusCode(500);
  }

  const supabase = createClient(
    "https://mnnbyrdnpuienzscjzjk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubmJ5cmRucHVpZW56c2NqemprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUyNDAxNDUsImV4cCI6MTk4MDgxNjE0NX0.ynlyyTYvPKrNHDJW7mRj3_X41VSihmzuEkOO5OJF6P0"
  );

  const RPC_URL = provider_list[chainId];

  const { data, error } = await supabase
    .from("Users")
    .select()
    .eq("email", email);

  console.log("Data ", data);
  if (error) {
    return res.statusCode(500);
  }
  const { wallet, privatekey } = data[0];
  const provider = getWeb3(RPC_URL);
  const contract = getContract(provider, ERC721, contractAddress);
  const account = provider.eth.accounts.privateKeyToAccount(privatekey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;

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

  for (i = 0; i < times; i++) {
    const tx1 = contract.methods.safeMint();
    const [gasPrice, gasCost1] = await Promise.all([
      web3.eth.getGasPrice(),
      tx1.estimateGas({ from: admin }),
    ]);
    const dataTx = tx1.encodeABI();
    const txData = {
      from: admin,
      to: contract.options.address,
      data: dataTx,
      gas: gasCost1,
      gasPrice,
    };
    const receipt = await web3.eth.sendTransaction(txData);
    console.log(`Tx hash: ${receipt.transactionHash}`);
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
    await contract.methods.setTokenURI(tokenId, added2.path).send();
  }
};

module.exports = createNft;
