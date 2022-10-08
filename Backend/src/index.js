/* 
* Configuracion del index que escuchara las solicitudes al servidos.
*/
const app = require("./server.js");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Listening on Port: ${port}`)});

