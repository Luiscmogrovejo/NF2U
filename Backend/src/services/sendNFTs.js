require("dotenv").config();
const axios = require("axios");
const { provider_list, contracts_addresses } = require("../config/providers");
const ERC721 = require("../abis/ERC721Abi.json");
const { getWeb3, getContract } = require("../config/web3");

const sendNFTs = async (addresses, req, res) => {
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
  const { wallet, privateKey } = data;
  const provider = getWeb3(RPC_URL);
  const contract = getContract(provider, ERC721, contractAddress);
  const account = provider.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
  for (i =0; i<addresses.length;i++) {
    const tx1 = contract.methods.safeTransferFrom(account.address,addresses[i],(i+1));
    const [gasPrice, gasCost1] = await Promise.all([
      web3.eth.getGasPrice(),
      tx1.estimateGas({ from: admin })
    ])
    const dataTx = tx1.encodeABI();
    const txData = {
      from: admin,
      to: contract.options.address,
      data: dataTx,
      gas: gasCost1,
      gasPrice
    };
    const receipt = await web3.eth.sendTransaction(txData);
    console.log(`Tx hash: ${receipt.transactionHash}`);
    const hexAddress = receipt.logs[0].data;
    const newContract = provider.eth.abi.decodeParameter("address", hexAddress);
    return res.json({
      status: 200,
      data: { collectionAddress: newContract, txHash: receipt.transactionHash },
    });
  }

};

module.exports = createNft;
