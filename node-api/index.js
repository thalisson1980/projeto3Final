const express = require('express');
const bodyParser = require ('body-parser');
const cors = require('cors');




const db = require('../node-api/bd/ligacao');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());
app.use(cors());

//definir rotas
const userRoute = require('./routes/user');
app.use('/user',userRoute);
const keyRoute = require('./routes/keyController');
app.use('/key',keyRoute);
const keyRequestRoute = require('./routes/keyRequestController');
app.use('/keyRequest', keyRequestRoute);
const containerRoute = require('./routes/containerController');
app.use('/container',containerRoute);
const collectionRoute = require('./routes/collectionController');
app.use('/collection',collectionRoute);
const containerCollectionRoute = require('./routes/containerCollectionController');
app.use('/containerCollection',containerCollectionRoute);
const DDCCFFRoute = require('./routes/ddccffController');
app.use('/DDCCFF',DDCCFFRoute);


  

app.listen(3000,(req,res) =>{
    console.log("Servidor a ouvir na porta 3000");
});