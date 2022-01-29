const express = require('express');
const router = express.Router();

const Collection = require('../models/collection');

router.post('/create',async (req,res)=>{
    try{
        

       const collection = new Collection({
        collectionStartDate:req.body.collectionStartDate,
        collectionEndDate:req.body.collectionEndDate,
        massCollected_kg:req.body.massCollected_kg,
        circuito:req.body.circuito
    });

        const result =  await collection.save() ;   

        res.json({result});
        

    }catch(err){
        console.log("what2")
        res.json({message:err})
    }

});


module.exports = router;