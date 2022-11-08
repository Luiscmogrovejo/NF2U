require("dotenv").config();
import { provider_list, contracts_addresses } from "../config/providers";
// const {ipfsClient} = require("ipfs-http-client");
import { ERC721Abi } from "../abis/ERC721Abi";
import { getWeb3, getContract } from "../config/web3";
import { createClient } from "@supabase/supabase-js";
import { create } from "ipfs-http-client";

// async function ipfsClient() {
//   const ipfs = create({
//     host: "ipfs.infura.io",
//     port: 5001,
//     protocol: "https",
//   });
//   return ipfs;
// }

// /**
//  * @param {import("ipfs-core-types/dist/src/utils").IPFSPath} hash
//  */
// async function getData(hash: any) {
//   let ipfs = await ipfsClient();

//   let asyncitr = ipfs.cat(hash);

//   for await (const itr of asyncitr) {
//     let data = Buffer.from(itr).toString();
//     console.log(data);
//   }
// }

export const createNft = async (
  /** @type {{ body: { chainId: any; email: any; times: any; image: any; contractAddress: any; }; }} */ req: {
    body: {
      chainId: any;
      email: any;
      times: any;
      image: any;
      contractAddress: any;
      name: any;
      description: any;
      snarky: any;
    };
  },
  /** @type {{ statusCode: (arg0: number) => any; }} */ res: {
    statusCode: (arg0: number) => any;
  }
) => {
  console.log("---------");
  console.log(req.body);
  
  const { chainId, email, times, image, contractAddress, name, description, snarky } = req.body;
  if (!chainId) {
    return res.statusCode(500);
  }
  // console.log("--------- CONTRACT ADDRESS -------");
  // console.log(email);
  // console.log(contractAddress);
  // console.log("--------- END OF CONTRACT ADDRESS -------");
  

  const supabase = createClient(
    "https://mnnbyrdnpuienzscjzjk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubmJ5cmRucHVpZW56c2NqemprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUyNDAxNDUsImV4cCI6MTk4MDgxNjE0NX0.ynlyyTYvPKrNHDJW7mRj3_X41VSihmzuEkOO5OJF6P0"
  );
  //const address = contracts_addresses[chainId];
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
  const contract = getContract(provider, ERC721Abi, contractAddress);
  //console.log("contract: ", contract);
  
  const account = provider.eth.accounts.privateKeyToAccount(privatekey);
  provider.eth.accounts.wallet.add(account);
  provider.eth.defaultAccount = account.address;

  for (let i = 0; i < times; i++) {
    // const idNumber = contract.methods._tokenIdCounter().call();
    // console.log("idNumber", idNumber);
    const tx1 = contract.methods.safeMint();
    const [gasPrice, gasCost1] = await Promise.all([
      provider.eth.getGasPrice(),
      tx1.estimateGas({ from: wallet }),
    ]);
    const dataTx = tx1.encodeABI();
    const txData = {
      from: wallet,
      to: contract.options.address,
      data: dataTx,
      gas: gasCost1,
      gasPrice,
    };
    const receipt = await provider.eth.sendTransaction(txData);

    //let ipfs = await ipfsClient();

    // let result = await ipfs.add(image);
    // console.log(result);

    console.log(`Tx hash: ${receipt.transactionHash}`);
    //const addedImage = await ipfs.add(image);

    //const snarkyData = snarky;
    //const external_url = "url";

    // const data = JSON.stringify({
    //   name,
    //   description,
    //   //external_url,
    //   id: idNumber,
    //   attributes: {
    //     snarkyData,
    //   }
      //image: addedImage.path,
    // });

    //const added2 = await ipfs.add(data);
    //await contract.methods._setTokenURI(idNumber, added2.path).send();
  }
};

module.exports = createNft;
