/*
 * Configuracion del index que escuchara las solicitudes al servidos.
 */
import * as dotenv from "dotenv";
dotenv.config();

const app = require("./server.ts");

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
