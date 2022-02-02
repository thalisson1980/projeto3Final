const express = require('express');
const router = express.Router();
const bd = require('../bd/ligacao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authToken = require('../token/secret.json');
const User = require('../models/user');
const Container = require('../models/container');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middlewares/auth');




router.use(authMiddleware);

router.post('/containers',async (req,res)=>{
    try{
        
        var code = { ddccff: req.body };
        const containers = await Container.find(code)
        
       
        
      res.json(containers);

    }catch(err){
        res.json({message:err})
    }

});

router.get('/', authMiddleware, async(req, res) => {
    try {

        const containers = await Container.find();
        return res.json(containers);

    } catch (error) {
        return res.status(400).send({ error: 'Error loading containers' })
    }
})

router.get('/:containerId', authMiddleware, async(req, res) => {
    try {

        const container = await Container.findById(req.params.containerId);
        return res.json({ container });

    } catch (error) {
        return res.status(400).send({ error: 'Error loading container' })
    }
})


router.post('/', authMiddleware, async(req, res) => {


    try {
        const { authorization } = req.headers
        const token = authorization.replace("Bearer ", "")
        const payload = jwt.verify(token, authToken.secret);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(400).send("User not found");
        }

        if (user.permission !== 'admin') {
            return res.status(400).send("You are not authorized to do this");
        }

        const _id = uuidv4();
        const container = await Container.create({...req.body, _id });
        return res.send({ container });


    } catch (err) {
        return res.status(400).send({ error: 'Error creating new container' });
    }
});

router.put('/:containerId', authMiddleware, async(req, res) => {
    try {

        const { authorization } = req.headers
        const token = authorization.replace("Bearer ", "")
        const payload = jwt.verify(token, authToken.secret);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(400).send("User not found");
        }

        if ((user.permission === 'view')) {
            return res.status(400).send("You are not authorized to do this");
        }

        let emp = req.body.Employee;
        let circ = req.body.Circuit;

        const { dateStartTime, dateEndTime, massaCollect_kg } = req.body;
        const containers = await Container.findByIdAndUpdate(req.params.containerId, {
            employees: emp,
            circuit: circ,
            dateStartTime,
            dateEndTime,
            massaCollect_kg
        }, { new: true });

        await containers.save();

        return res.send({ Container });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating container' })
    }
});

router.delete('/:containerId', authMiddleware, async(req, res) => {
    try {
        const { authorization } = req.headers
        const token = authorization.replace("Bearer ", "")
        const payload = jwt.verify(token, authToken.secret);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(400).send("User not found");
        }

        if (user.permission !== 'admin') {
            return res.status(400).send("You are not authorized to do this");
        }

        await Container.findByIdAndRemove(req.params.containerId);
        return res.status(200).send({ message: 'Container deleted' });

    } catch (err) {
        return res.json({ error: 'Error deleting container' });
    }
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const container= require('../models/container');

// router.post('/containers',async (req,res)=>{
//     try{

//         var code = { ddccff: req.body };
//         const containers = await container.find(code)



//       res.json(containers);

//     }catch(err){
//         res.json({message:err})
//     }

// });

// router.post('/new',async (req,res)=>{
//     try{

//         const Container = new container({
//             id: req.body.id,
//             gpsLocation:req.body.gpsLocation,
//             ocupation:req.body.ocupation ,
//             ddccff: req.body.ddccff
//         });
//         const result = await Container.save();

//       res.json(result);

//     }catch(err){
//         res.json({message:err})
//     }

// });





// module.exports = router;