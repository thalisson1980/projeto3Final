const express = require('express');
const router = express.Router();
const keyRequest = require('../models/keyRequest');
const User = require('../models/user');
const Key = require('../models/key');
const authToken = require('../token/secret.json');
const authMiddleware = require('../middlewares/auth');


router.post('/',authMiddleware,async (req,res) =>{
     //Verificar oermissoes de user pelo cookie
     const { token } = req.session
     const payload = jwt.verify(token, authToken.secret);
     const user = await User.findById(payload.id);

     if (!user) {
         return res.status(400).send("User not found");
     }

     
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

module.exports = router;