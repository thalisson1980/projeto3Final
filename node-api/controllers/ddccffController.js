const express = require('express');
const router = express.Router();
const code = require('../models/DDCCFF');

router.post('/parishList',async (req,res)=>{
    try {

        county = req.body.substring(0,4);
        const parishList = await code.find({code:{$regex: county + ".*"}})
        
        let list;
        list =[];

        parishList.forEach((Element) =>{
            if(Element.code.substring(0,4)==county){
                const [district,county, ...parish] = Element.location.split(',');
                let obj={
                    code: Element.code,
                    location: parish
                  }
        
                list.push(obj);
            }

        });

        res.json(list);

    }catch(error){
        res.json({message:error})
    }
})

router.get('/allCounties',async (req,res)=>{
    try {
        
        const allList = await code.find({code: /^16/});
        
        let list;
        list =[];

        let primeiro={
            code: '160101',
            location: 'ARCOS DE VALDEVEZ '
          }

        list.push(primeiro);
     
       allList.forEach((Element) =>{
        for(  i = 0;i<list.length;i++){
            controlo = 1;
            if(Element.code.substring(2,4)==list[i].code.substring(2,4)){
                controlo =0;
                break;
            }      
        }
            if(controlo==1){
                distrito = Element.location.split(',');
                let obj={
                    code: Element.code,
                    location: distrito[1]
                }
                list.push(obj);
            }
       });
        res.json(list);
    }catch(error){
        res.json({message:error})
    }
})






module.exports = router;