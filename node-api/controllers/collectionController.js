const express = require('express');
const router = express.Router();

const Collection = require('../models/collection');

router.post('/create',async (req,res)=>{
    try{
        

       const collection = new Collection({
        dateStartTime:req.body.dateStartTime,
        dateEndTime:req.body.dateEndTime,
        massaCollect_kg:req.body.massaCollect_kg,
        circuit:req.body.circuit
    });

        const result =  await collection.save() ;   

        res.json({result});
        

    }catch(err){
        res.json({message:err})
    }

});


module.exports = router;