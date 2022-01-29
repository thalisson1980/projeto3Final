const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.get('/',async (req,res)=>{
    try {

        const users = await user.find();
        res.json(users);

    }catch(error){
        res.json({message:error})
    }
})

router.post('/',async (req,res) =>{
    const User = new user({
        name: req.body.nome,
        email: req.body.email,
        password:req.body.password

    });
    
    try{
        const resultado = await User.save();
        res.json(resultado);
    }catch(error){
        res.json({message : error});
    }
    
    
}); 

router.post('/login',async (req,res)=>{
    try{
        
        var query1 = { email: req.body.email };
        var query2 = { email: req.body.email,password:req.body.password };
       
        
        const User1 =  await user.findOne(query1) ;     
        if(User1){
            
            const User2 =  await user.findOne(query2) ; 
            if(User2){
                res.json({message: "sucesso"});
            }else{
                
                res.json({message: "password incorreta"});
            }
        }else{
            res.json({message: "email nao existe"});
        }

    }catch(err){
        console.log("what2")
        res.json({message:err})
    }

});

module.exports = router;