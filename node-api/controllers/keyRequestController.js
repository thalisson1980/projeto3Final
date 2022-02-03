const express = require('express');
const router = express.Router();
const keyRequest = require('../models/keyRequest');
const user = require('../models/user');


router.post('/',async (req,res) =>{
    
    if(req.body.email){
        var query1 = { email: req.body.email };

        const User1 =  await user.findOne(query1);
        
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

    const User1 =  await user.findOne(query1); 
    if(User1){
        if(User1.key==null){
            
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
        }else{
            var client = { userEmail: req.body };
            requests = await keyRequest.find(client);
            var activeRequest;
            requests.forEach(element => {
                if(element.state == "pending"){
                   activeRequest = res.json({message:"You already made the request for a key! Please wait."})
                }
            });

            if(!activeRequest){
                res.json({message:"assigned"})
            }

        }
               
    }
    }
    
    
    
}); 

module.exports = router;