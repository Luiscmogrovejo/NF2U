/* 
* Configuracion del server.
*/
const express = require("express");
const cors = require("cors");
const router = require("./routes.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/",router);
app.use("*", (req, res) => res.status(404).json({error: "Not Found"}));

module.exports = app;