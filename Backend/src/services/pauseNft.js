require("dotenv").config();
const axios = require("axios");
const Web3 = require("web3");
const { provider_list, contracts_addresses } = require("../config/providers");
const ERC721 = require("../abis/ERC721Abi.json");
const { getWeb3, getContract } = require("../config/web3");
const supabase = require("@supabase/supabase-js");
const { createClient } = supabase;

const pauseNft = async (req, res) => {
  const { chainId, email } = req.body;
  if (!chainId) {
    return res.statusCode(500);
  }

  const supabase = createClient(
    "https://mnnbyrdnpuienzscjzjk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubmJ5cmRucHVpZW56c2NqemprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUyNDAxNDUsImV4cCI6MTk4MDgxNjE0NX0.ynlyyTYvPKrNHDJW7mRj3_X41VSihmzuEkOO5OJF6P0"
  );

  const RPC_URL = provider_list[chainId];
  const contractAddress = contracts_addresses[chainId];

  const { data, error } = await supabase
    .from("Users")
    .select()
    .eq("email", email);

  // console.log("Data ", data);
  if (error) {
    return res.statusCode(500);
  }
  const { wallet, privateKey } = data;
  const provider = getWeb3(RPC_URL);
  const contract = getContract(provider, ERC721, contractAddress);
  const account = provider.eth.accounts.privateKeyToAccount(
    privateKey.slice(2, 64)
  );
  provider.eth.accounts.wallet.add(account);
  provider.eth.defaultAccount = account.address;

  const tx1 = contract.methods.pause();
  const [gasPrice, gasCost1] = await Promise.all([
    provider.eth.getGasPrice(),
    tx1.estimateGas({ from: account.address }),
  ]);
  const dataTx = tx1.encodeABI();
  const txData = {
    from: account.address,
    to: contract.options.address,
    data: dataTx,
    gas: gasCost1,
    gasPrice,
  };
  const receipt = await provider.eth.sendTransaction(txData);
  console.log(`Tx hash: ${receipt.transactionHash}`);
  if (!receipt) {
    return res.json({
      status: 500,
      data: { error: "Invalid transaction" },
    });
  }
  return res.json({
    status: 200,
    data: { txHash: receipt.transactionHash, paused: true },
  });
};

module.exports = pauseNft;
