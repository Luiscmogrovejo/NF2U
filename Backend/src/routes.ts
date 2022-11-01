/*
 * Configuracion de las rutas del servidor.
 */
import { Router } from "express";
//wallet creation
const createWallet = require("./services/createWallet");
const getWallet = require("./services/getWallet");

//index
const routeIndex = require("./services/routeIndex.js");

//colection
const getCollection = require("./services/getCollection.js");
const createCollection = require("./services/createCollection");

//nft
const getNft = require("./services/getNft.js");
const createNft = require("./services/createNft.ts");
const transferNft = require("./services/transferNft.js");
const pauseNft = require("./services/pauseNft.js");
// const bridgeNft = require("./services/bridgeNft.js");

//quickNode
const quickNode = require("./services/getBlockInformation.js");

// keys for unlock content
// const createKey = require("./services/createKey.js");

// support Chat message
const supportChat = require("./services/supportChat.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++

const router: Router = require("express").Router();

router.post("/createWallet", createWallet);
router.post("/getWallet", getWallet);

router.post("/getCollection", getCollection);
router.post("/createCollection", createCollection);

router.post("/getNft", getNft);
router.post("/create-nft", createNft);
router.post("/transferNft", transferNft);
router.post("/pauseNft", pauseNft);
// router.post("/bridgeNft", bridgeNft);
// router.post("/createKey", createKey);
router.post("/supportChat", supportChat);

router.get("/quickNode", quickNode);
router.get("/quickNode", quickNode);
router.get("/", routeIndex);

module.exports = router;
