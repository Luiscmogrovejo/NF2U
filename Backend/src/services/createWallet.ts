//require("dotenv").config();
const axios = require("axios").default;
const Web3 = require('web3');
const supabase = require('@supabase/supabase-js');
const { createClient } = supabase;


const createWallet  = async (req: { body: { email: any; }; }, res: { json: (arg0: { status: string; wallet: any; }) => any; }) => {
    
    const supabase = createClient('https://mnnbyrdnpuienzscjzjk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubmJ5cmRucHVpZW56c2NqemprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUyNDAxNDUsImV4cCI6MTk4MDgxNjE0NX0.ynlyyTYvPKrNHDJW7mRj3_X41VSihmzuEkOO5OJF6P0');
  
    const provider_array = {
        "mumbai": "https://attentive-ancient-spring.matic-testnet.discover.quiknode.pro/ffd31463498f334a11f8583f94c9e030e0b82c90/",
        "optimism" : "https://muddy-methodical-shard.optimism-goerli.discover.quiknode.pro/1b6f71eb1516d728ed685e3feb911a318aa8837f/",
        "skroll":"https://prealpha.scroll.io/l2/",
        "goerli":"https://distinguished-light-breeze.ethereum-goerli.discover.quiknode.pro/39ed6ebac3cfbed9018e3298e383ef03820f023e/"
    }
    
    var web3 = new Web3(new Web3.providers.HttpProvider(provider_array.goerli));   
    var account = web3.eth.accounts.create();

    // console.log(account.address);
    // console.log(account.privateKey);
    // console.log(req.body.email);
    //console.log(supabase);

    const {respuesta, error} = await supabase
    .from('Users')
    .insert([
        { email: req.body.email, wallet: account.address, privatekey:account.privateKey  }
    ]);

    if(!error) {
        return (
            res.json({
                status: "ok",
                wallet: account.address
            })
        )
    }
    
}

module.exports = createWallet;