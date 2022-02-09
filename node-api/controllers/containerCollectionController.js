const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authToken = require('../token/secret.json');
const authMiddleware = require('../middlewares/auth');

const containerCollection = require('../models/containerCollection');
const user = require('../models/user');
const container = require('../models/container');
const Collection = require('../models/collection');



router.post('/findByUser', async (req,res)=>{
    try{
   
        const User = await user.findOne({email: req.body.email });
        
        var queryCol = { key: User.key };
        var mysort = { collectionDate: -1 };

        const containerCollections =  await containerCollection.find(queryCol).sort(mysort) ;  
        
        
        let vetorCollections = [];
        
        for(let i=0;i<containerCollections.length;i++){
            let existe = false;
            for(let j=0;j<vetorCollections.length;j++){
               
                if(containerCollections[i].collectionID === vetorCollections[j]._id.toString()){
                    existe = true;
                  
                }
            }
            if(!existe){
                
                await Collection.findById(containerCollections[i].collectionID)
                 .then(found =>{
                     vetorCollections.push(found);
                 })
                 .catch(err =>{
                     console.log(err)
                 })
               
                
                
            }
        }
     
        let respostaFinal = [];
       
        
          for (const  Element of vetorCollections){
              let resposta = []
              let containerCollections = await containerCollection.find({collectionID:Element._id.toString(),key:User.key})
              let allCollections = await containerCollection.find({collectionID:Element._id.toString()})
              for (const collect of  containerCollections){
                    let existe = false;
                try{
                    for(let i=0;resposta.length;i++){
                            if(collect.container === resposta[i].container){
                                resposta[i].massaCollect_kg = resposta[i].massaCollect_kg + Element.massaCollect_kg/allCollections.length;
                                existe = true;
                            }
                    }
                }catch(err){
                    
                }finally{
                    if(!existe){
                        let obj = {
                            container:collect.container,
                            massaCollect_kg: Element.massaCollect_kg/allCollections.length,
                            collectionDate: Element.dateEndTime
                        }
                        resposta.push(obj);
                        
                    }
                }
                }  

                for( unico of resposta){
                    respostaFinal.push(unico)
                }

                
            }
       
        
        res.json({collections:respostaFinal})

    }catch(err){
       
        res.json({message:err})
    }

});

router.post('/dates',async (req,res)=>{
    var firstCollect = new Date();
    var lastCollect = new Date();
    lastCollect.setFullYear('1900');
    firstCollect.setFullYear('3000')


    var queryClient = { email: req.body.email};
    const User = await user.findOne(queryClient)
    let collectionsList;
    collectionsList = [];
    if(req.body.choice == 'county' || req.body.choice == "recolha"){
        var queryCode = {ddccff: req.body.code.substring(0,4)};
        let containers = await container.find({$regex: queryCode + ".*"});
        if(req.body.choice == "recolha"){
            containers = await container.find();
        }
        for(const Element of containers){
            if(Element.ddccff.substring(0,4)==req.body.code.substring(0,4) || req.body.choice == "recolha"){
                var collections = await containerCollection.find({container: Element.container_cod,key:User.key});
                for( const collect of collections){
                    
                    let collectAtual = await Collection.findOne({_id:collect.collectionID})
                    let aux = await containerCollection.find({collectionID:collect.collectionID})
                    if(collectAtual.dateEndTime < firstCollect ){
                        firstCollect =collectAtual.dateEndTime;
                    }
                    if(collectAtual.dateEndTime > lastCollect ){
                        lastCollect =collectAtual.dateEndTime;
                    }

                    let existeCollect = false;
                    for(const collection of collectionsList){
                        if(collection.collection === collectAtual._id.toString()){

                             collection.numberCollections = collection.numberCollections+1;   
                            existeCollect = true;
                        }
                    }
                    if(!existeCollect){
                        
                        collectionsList.push({collection:collectAtual._id.toString(),massaCollect_kg:collectAtual.massaCollect_kg,numberCollections:1,collectionDate:collectAtual.dateEndTime,totalCollections:aux.length});
                    }
                   
                }
            }
        }
        
       
    }
    if(req.body.choice == 'parish'){
        const containers = await container.find({ddccff: req.body.code});
        for(const Element of containers){
            var collections = await containerCollection.find({container: Element.container_cod,key:User.key});
            for( const collect of collections){
                let collectAtual = await Collection.findOne({_id:collect.collectionID})
                let aux = await containerCollection.find({collectionID:collect.collectionID})
                if(collectAtual.dateEndTime < firstCollect ){
                    firstCollect =collectAtual.dateEndTime;
                }
                if(collectAtual.dateEndTime > lastCollect ){
                    lastCollect =collectAtual.dateEndTime;
                }

                let existeCollect = false;
                for(const collection of collectionsList){
                    if(collection.collection === collectAtual._id.toString()){

                         collection.numberCollections = collection.numberCollections+1;   
                        existeCollect = true;
                    }
                }
                if(!existeCollect){
                    
                    collectionsList.push({collection:collectAtual._id.toString(),massaCollect_kg:collectAtual.massaCollect_kg,numberCollections:1,collectionDate:collectAtual.dateEndTime,totalCollections:aux.length});
                }
            }
            
        }
    
    }

    if(req.body.choice == 'container'){
  
        var queryContainer = {container: req.body.id,key:User.key};
        var collections = await containerCollection.find(queryContainer);
            for( const collect of collections){
                let collectAtual = await Collection.findOne({_id:collect.collectionID})
                let aux = await containerCollection.find({collectionID:collect.collectionID})
                if(collectAtual.dateEndTime < firstCollect ){
                    firstCollect =collectAtual.dateEndTime;
                }
                if(collectAtual.dateEndTime > lastCollect ){
                    lastCollect =collectAtual.dateEndTime;
                }

                let existeCollect = false;
                for(const collection of collectionsList){
                    if(collection.collection === collectAtual._id.toString()){

                         collection.numberCollections = collection.numberCollections+1;   
                        existeCollect = true;
                    }
                }
                if(!existeCollect){
                    
                    collectionsList.push({collection:collectAtual._id.toString(),massaCollect_kg:collectAtual.massaCollect_kg,numberCollections:1,collectionDate:collectAtual.dateEndTime,totalCollections:aux.length});
                }
            }
 
    }
   
    res.json({first:firstCollect,last:lastCollect,collections:collectionsList});
});

router.post('/listByDate',async (req,res) =>{
    
})


router.post('/create',async (req,res)=>{
    try{
        

       const containerCollect = new containerCollection({
        key:req.body.key,
        container:req.body.container,
        collectionID:req.body.collectionID
    });

        const result =  await containerCollect.save() ;   

        res.json({result});
        

    }catch(err){
        console.log("what2")
        res.json({message:err})
    }

});

module.exports = router;