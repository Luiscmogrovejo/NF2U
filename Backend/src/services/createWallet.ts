//require("dotenv").config();
import axios from "axios";
import { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import Web3 from "web3";

export const createWallet = async (req: Request, res: Response) => {
  console.log("create Wallet triggered");
  
  const supabase = createClient(
    "https://mnnbyrdnpuienzscjzjk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubmJ5cmRucHVpZW56c2NqemprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUyNDAxNDUsImV4cCI6MTk4MDgxNjE0NX0.ynlyyTYvPKrNHDJW7mRj3_X41VSihmzuEkOO5OJF6P0"
  );

  const provider_array = {
    mumbai:
      "https://attentive-ancient-spring.matic-testnet.discover.quiknode.pro/ffd31463498f334a11f8583f94c9e030e0b82c90/",
    optimism:
      "https://muddy-methodical-shard.optimism-goerli.discover.quiknode.pro/1b6f71eb1516d728ed685e3feb911a318aa8837f/",
    skroll: "https://prealpha.scroll.io/l2/",
    goerli:
      "https://distinguished-light-breeze.ethereum-goerli.discover.quiknode.pro/39ed6ebac3cfbed9018e3298e383ef03820f023e/",
  };

  var web3 = new Web3(new Web3.providers.HttpProvider(provider_array.goerli));
  var account = web3.eth.accounts.create();

  console.log("------- CREATED PUBLIC ADDRESS ------");
  console.log(account.address);
  console.log("------- CREATED PRIVATE KEY ------");
  console.log(account.privateKey);
  // console.log("------- REQ ------");
  // console.log(req);
  console.log("------- REQ.BODY ------");
  console.log(req.body);
  console.log("------- REQ.BODY.EMAIL ------");
  console.log(req.body.email);
  console.log("------- SUPABASE OBJECT ------");
  console.log(supabase);

  const { error } = await supabase.from("Users").insert([
    {
      email: req.body.email,
      wallet: account.address,
      privatekey: account.privateKey,
    },
  ]);

  if (error) {
    return res.json({
      status: 500,
      msg: "error con Supabase",
      error_enviado_por_supabase: error
    })
  }

  if (!error) {
    return res.json({
      status: "ok",
      wallet: account.address,
    });
  }
};

module.exports = createWallet;
