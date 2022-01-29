const  db  = require('mongoose');

db.connect('mongodb://localhost/noderest',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,

 });
db.connection.once('open',function(){
 console.log('Ligaçao a base de dados efetuada com sucesso')
}).on('error',function(error){
    console.log('erro: ',error)
});

db.Promise = global.Promise;

db.exports = db;