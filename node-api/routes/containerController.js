const express = require('express');
const router = express.Router();
const container= require('../models/container');

router.post('/containers',async (req,res)=>{
    try{
        
        var code = { ddccff: req.body };
        const containers = await container.find(code)
        
       
        
      res.json(containers);

    }catch(err){
        res.json({message:err})
    }

});

router.post('/new',async (req,res)=>{
    try{
        
        const Container = new container({
            id: req.body.id,
            gpsLocation:req.body.gpsLocation,
            ocupation:req.body.ocupation ,
            ddccff: req.body.ddccff
        });
        const result = await Container.save();

      res.json(result);

    }catch(err){
        res.json({message:err})
    }

});





module.exports = router;