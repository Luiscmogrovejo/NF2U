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


// keys for unlock content
const createKey = require("./services/createKey.js");


//+++++++++++++++++++++++++++++++++++++++++++++++++++++

const router = express.Router();

router.route("/createWallet").post(createWallet);
router.route("/getWallet").post(getWallet);

router.route("/getCollection").post(getCollection);
router.route("/createCollection").post(createCollection);

router.route("/getNft").post(getNft);
router.route("/createNft").post(createNft);
router.route("/transferNft").post(transferNft);
router.route("/pauseNft").post(pauseNft);
router.route("/bridgeNft").post(bridgeNft);

router.route("/createKey").post(createKey);



router.route("/").get(routeIndex);

module.exports = router