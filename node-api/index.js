const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require("./router/routes");

const db = require('../node-api/bd/ligacao');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(cors());
app.use(router);


app.listen(3000, (req, res) => {
    console.log("Servidor a ouvir na porta 3000");
});