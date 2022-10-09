/*
 * Configuracion de las rutas del servidor.
 */
const express = require("express");
//wallet creation
const createWallet = require("./services/createWallet.js");
const getWallet = require("./services/getWallet.js");

//index
const routeIndex = require("./services/routeIndex.js");

//colection
const getCollection = require("./services/getCollection.js");
const createCollection = require("./services/createCollection.js");

//nft
const getNft = require("./services/getNft.js");
const createNft = require("./services/createNft.js");
const transferNft = require("./services/transferNft.js");
const pauseNft = require("./services/pauseNft.js");
const bridgeNft = require("./services/bridgeNft.js");

//quickNode
const quickNode = require("./services/getBlockInformation.js");

// keys for unlock content
const createKey = require("./services/createKey.js");

// support Chat message
const supportChat = require("./services/supportChat.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++

const router = express.Router();

router.route("/createWallet").post(createWallet);
router.route("/getWallet").post(getWallet);

router.route("/getCollection").post(getCollection);
router.route("/createCollection").post(createCollection);

router.route("/getNft").post(getNft);
router.route("/create-nft").post(createNft);
router.route("/transferNft").post(transferNft);
router.route("/pauseNft").post(pauseNft);
router.route("/bridgeNft").post(bridgeNft);
router.route("/quickNode").get(quickNode);
router.route("/createKey").post(createKey);

router.route("/quickNode").get(quickNode);

router.route("/supportChat").post(supportChat);

router.route("/").get(routeIndex);

module.exports = router;
