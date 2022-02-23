const express = require('express');
const router = express.Router();
const keyRequest = require('../models/keyRequest');
const User = require('../models/user');
const Key = require('../models/key');
const authToken = require('../token/secret.json');
const authMiddleware = require('../middlewares/auth');
const { findOneAndUpdate } = require('../models/keyRequest');


router.post('/',async (req,res) =>{
     

     
    if(req.body.email){
        var query1 = { email: req.body.email };

        const User1 =  await User.findOne(query1);
        
        if(User1){
            const request = new keyRequest({
                userEmail: req.body.email,
                requestReason:req.body.reason
            });

            try{
                await request.save();
               res.json({message:"The key request was made succesfully"});
           }catch(error){
               res.json({message : error});
           }  
        }

       

    }else{
        var query1 = { email: req.body };

    const User1 =  await User.findOne(query1); 
    const chave = await keyRequest.findOne({userEmail:User1.email})
    if(!chave){
        
            
            const request = new keyRequest({
                userEmail: req.body,
                requestReason:"first key"
            });

            try{
                 await request.save();
                res.json({message:"The key request was made succesfully"});
            }catch(error){
                res.json({message : error});
            } 
    }       
    else{
         var client = { userEmail: req.body };
            requests = await keyRequest.find(client);
            var activeRequest;
            requests.forEach(element => {
                if(element.state == "pending"){
                   activeRequest =true;
                    res.json({message:"You already made the request for a key! Please wait."})
                }
            });

            if(!activeRequest){
                res.json({message:"assigned"})
            }

        }
               
    }
    

}); 

router.get('/getPending',async (req,res) =>{
    const pedidos = await keyRequest.find({state:"pending"});
    let aux = [];
    try{
    
       for(const pedido of pedidos){
           if(pedido.state){
                aux.push(pedido)
           }
       }
       res.json({pedidos:aux})
    }catch(err){
        res.json({message:"No peding key requests"})
    }
   
}); 

router.put('/',async (req,res) =>{
    console.log(req.body)
    const user = await User.findOne({email:req.body.user})
    if(req.body.decision == 'atribuir' && user){
         await keyRequest.findOneAndUpdate({_id:req.body.idChave},{$set:{state:'assigned'}})
         let data = new Date();
         const chaves = await Key.find({user:user._id})
         for(const chave of chaves){
             if(!chave.endDate){
                 await Key.findOneAndUpdate({_id:chave._id},{$set:{ativo:false,endDate:data}})
             }
         }
         res.json({idUser:user._id});

    }
    if(req.body.decision == 'negar' && user){
        await keyRequest.findOneAndUpdate({_id:req.body.idChave},{$set:{state:'denied'}})
        res.json("denied")
    }
});

module.exports = router;