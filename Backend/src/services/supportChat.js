const { Client } = require("@xmtp/xmtp-js");
const supabase = require("@supabase/supabase-js");
const { getWeb3 } = require("../config/web3");
const { ethers } = require("ethers");
const { createClient } = supabase;
const { provider_list } = require("../config/providers");

const supportChat = async (req, res) => {
  const { chainId, email, support_wallet, message } = req.body;
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
  const { privatekey } = data[0];

  const provider = getWeb3(RPC_URL);
  const account = provider.eth.accounts.privateKeyToAccount(privatekey);
  console.log("Account ", account);
  const wallet = ethers.Wallet.createRandom();
  console.log("Wallet ", wallet);
  const xmtp = await Client.create(wallet);
  const conversation = await xmtp.conversations.newConversation(support_wallet);

  // Load all messages in the conversation
  // const messages = await conversation.messages();
  // console.log("MESSAGES  ", messages);
  // Send a message
  await conversation.send(message);

  // Listen for new messages in the conversation
  for await (const message of await conversation.streamMessages()) {
    console.log(`[${message.senderAddress}]: ${message.content}`);
  }
};

module.exports = supportChat;
