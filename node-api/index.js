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
const userRoute = require('./controllers/user');
app.use('/user',userRoute);
const keyRoute = require('./controllers/keyController');
app.use('/key',keyRoute);
const keyRequestRoute = require('./controllers/keyRequestController');
app.use('/keyRequest', keyRequestRoute);
const containerRoute = require('./controllers/containerController');
app.use('/container',containerRoute);
const collectionRoute = require('./controllers/collectionController');
app.use('/collection',collectionRoute);
const containerCollectionRoute = require('./controllers/containerCollectionController');
app.use('/containerCollection',containerCollectionRoute);
const DDCCFFRoute = require('./controllers/ddccffController');
app.use('/DDCCFF',DDCCFFRoute);


  

app.listen(3000,(req,res) =>{
    console.log("Servidor a ouvir na porta 3000");
});