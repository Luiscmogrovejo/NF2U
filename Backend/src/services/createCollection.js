require("dotenv").config();
const axios = require("axios");
const Web3 = require("web3");
const { provider_list, contracts_addresses } = require("../config/providers");
const Factory = require("../abis/FactoryAbi.json");
const { getWeb3, getContract } = require("../config/web3");
const supabase = require("@supabase/supabase-js");
const { createClient } = supabase;

const createCollection = async (req, res) => {
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

  console.log("Data ", data);
  if (error) {
    return res.statusCode(500);
  }
  const { wallet, privateKey } = data;
  const provider = getWeb3(RPC_URL);
  const contract = getContract(provider, Factory, contractAddress);
  const web3 = new Web3();
  const account = web3.eth.accounts.privateKeyToAccount(
    "47af79b06ade026a8ef00d41f21f27d16956809e7c553cfd12c789fcabe99f6f"
  );
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
  const newCollection = await contract.methods._mintNewNFT(
    10,
    account.address,
    "Test",
    "TT",
    account.address
  );
  console.log(newCollection);
  return newCollection;
};

module.exports = createCollection;
