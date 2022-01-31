const express = require('express');
const router = express.Router();
const containerCollection = require('../models/containerCollection');
const user = require('../models/user');
const container = require('../models/container');
const Collection = require('../models/collection');

router.post('/findByUser',async (req,res)=>{
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
        console.log(vetorCollections)
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
                                resposta[i].massCollected_kg = resposta[i].massCollected_kg + Element.massCollected_kg/allCollections.length;
                                existe = true;
                            }
                    }
                }catch(err){
                    console.log(err)
                }finally{
                    if(!existe){
                        let obj = {
                            container:collect.container,
                            massCollected_kg: Element.massCollected_kg/allCollections.length,
                            collectionDate: Element.collectionEndDate
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
    var queryClient = { email: req.body.email};
    const User = await user.findOne(queryClient)
    let collectionsList;
    collectionsList = [];
    if(req.body.choice == 'county'){
        var queryCode = {ddccff: req.body.code.substring(0,4)};
        const containers = await container.find({$regex: queryCode + ".*"});
        


        var firstCollect = new Date();
        var lastCollect = new Date();
        lastCollect.setFullYear('1900');
        for(const Element of containers){
            if(Element.ddccff.substring(0,4)==req.body.code.substring(0,4)){
                var queryContainer = {container: Element.id,key:User.key};
                var collections = await containerCollection.find(queryContainer);
                for( const collect of collections){
                    if(collect.collectionDate < firstCollect ){
                        firstCollect =collect.collectionDate;
                    }
                    if(collect.collectionDate > lastCollect ){
                        lastCollect =collect.collectionDate;
                    }

                    collectionsList.push(collect);
                }
            }
        }
    }
    if(req.body.choice == 'parish'){
        var queryCode = {ddccff: req.body.code};
        const containers = await container.find( queryCode);
        
        var firstCollect = new Date();
        var lastCollect = new Date();
        lastCollect.setFullYear('1900');
        for(const Element of containers){
           
            var queryContainer = {container: Element.id,key:User.key};
            var collections = await containerCollection.find(queryContainer);
            for( const collect of collections){
                if(collect.collectionDate < firstCollect ){
                        firstCollect =collect.collectionDate;
                }
                if(collect.collectionDate > lastCollect ){
                        lastCollect =collect.collectionDate;
                }
                collectionsList.push(collect);
            }
            
        }
    
    }

    if(req.body.choice == 'container'){
        var firstCollect = new Date();
        var lastCollect = new Date();
        lastCollect.setFullYear('1900');
        
           
        var queryContainer = {container: req.body.id,key:User.key};
        var collections = await containerCollection.find(queryContainer);
            for( const collect of collections){
                if(collect.collectionDate < firstCollect ){
                        firstCollect =collect.collectionDate;
                }
                if(collect.collectionDate > lastCollect ){
                        lastCollect =collect.collectionDate;
                }
                collectionsList.push(collect);
            }
 
    }

    res.json({first:firstCollect,last:lastCollect,collections:collectionsList});
});


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