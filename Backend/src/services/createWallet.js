//require("dotenv").config();
const axios = require("axios").default;
const Web3 = require('web3');
const supabase = require('@supabase/supabase-js');
const { createClient } = supabase;

const createWallet  = async (req, res) => {
    
    const supabase = createClient('https://mnnbyrdnpuienzscjzjk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubmJ5cmRucHVpZW56c2NqemprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUyNDAxNDUsImV4cCI6MTk4MDgxNjE0NX0.ynlyyTYvPKrNHDJW7mRj3_X41VSihmzuEkOO5OJF6P0');
      
    var web3 = new Web3(new Web3.providers.HttpProvider("https://distinguished-light-breeze.ethereum-goerli.discover.quiknode.pro/39ed6ebac3cfbed9018e3298e383ef03820f023e/"));   
    var account = web3.eth.accounts.create();

    const {respuesta, error} = await supabase
    .from('Users')
    .insert([
        { email: req.body.email, wallet: account.address, privatekey:account.privateKey, project:'test project'   }
    ]);

    console.log('terminado');
    return account.address;
    
}

module.exports = createWallet;