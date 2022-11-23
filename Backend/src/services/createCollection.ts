require("dotenv").config();
import axios from "axios";
import Web3 from "web3";
import { provider_list, contracts_addresses } from "../config/providers";
import { FactoryAbi } from "../abis/FactoryAbi";
const { getWeb3, getContract } = require("../config/web3");
import { createClient } from "@supabase/supabase-js";

export const createCollection = async (
  req: { body: { chainId: any; email: any } },
  res: {
    statusCode: (arg0: number) => any;
    json: (arg0: {
      status: number;
      data: { collectionAddress: any; txHash: any };
    }) => any;
  }
) => {
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

  if (error) {
    return res.statusCode(500);
  }
  //const { wallet, privateKey } = data;
  const provider = getWeb3(RPC_URL);
  const contract = getContract(provider, FactoryAbi, contractAddress);
  //console.log( data);
  const account = provider.eth.accounts.privateKeyToAccount(
    data[0].privatekey // .slice(2, 64)
  );
  provider.eth.accounts.wallet.add(account);
  provider.eth.defaultAccount = account.address;
  const tx1 = contract.methods._mintNewNFT(
    10,
    account.address,
    "NF2Test",
    "NF2TST",
    account.address
  );
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

  const hexAddress = receipt.logs[0].data;
  const newContract = provider.eth.abi.decodeParameter("address", hexAddress);
  return res.json({
    status: 200,
    data: { collectionAddress: newContract, txHash: receipt.transactionHash },
  });
};

module.exports = createCollection;
