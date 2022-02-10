const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require("./router/routes");
const cookieSession = require('cookie-session');
const bd = require('./bd/ligacao');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

app.use(cookieSession({
    signed: false,
    secure: false,
    httpOnly: true
}))

app.use(router);
// app.use(db);


app.listen(3000, (req, res) => {
    console.log("Servidor a ouvir na porta 3000");
});