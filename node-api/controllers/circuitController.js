const express = require('express');
const router = express.Router();
const db = require('../bd/ligacao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authToken = require('../token/secret.json');
const Circuit = require('../models/circuit');
const User = require('../models/user');
const Container = require('../models/container');
const { v4: uuidv4 } = require('uuid');
// const authMiddleware = require('../middlewares/auth');


// router.use(authMiddleware);

router.get('/', async(req, res) => {
    try {
        const { token } = req.session
        const payload = jwt.verify(token, authToken.secret);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(400).send("User not found");
        }

        if ((user.permission === 'view') || (user.permission === 'viewEmployee')) {
            return res.status(400).send("You are not authorized to do this");
        }


        const circuits = await Circuit.find().populate(['containers']);
        return res.json(circuits);

    } catch (error) {
        return res.status(400).send({ error: 'Error loading circuits' });
    }
})

router.get('/:circuitId', async(req, res) => {
    try {
        const { token } = req.session
        const payload = jwt.verify(token, authToken.secret);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(400).send("User not found");
        }

        if ((user.permission === 'view') || (user.permission === 'viewEmployee')) {
            return res.status(400).send("You are not authorized to do this");
        }

        const circuit = await Circuit.findById(req.params.circuitId).populate(['containers']);
        return res.json({ circuit });

    } catch (error) {
        return res.status(400).send({ error: 'Error loading circuit' })
    }
})


router.post('/', async(req, res) => {


    try {
        const { token } = req.session
        const payload = jwt.verify(token, authToken.secret);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(400).send("User not found");
        }

        if ((user.permission === 'view') || (user.permission === 'viewEmployee')) {
            return res.status(400).send("You are not authorized to do this");
        }

        const _id = uuidv4();
        const circuit = await Circuit.create({...req.body, _id });
        return res.send({ circuit });


    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error creating new circuit' });
    }
});

router.put('/:circuitId', async(req, res) => {
    try {

        const { token } = req.session
        const payload = jwt.verify(token, authToken.secret);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(400).send("User not found");
        }

        if ((user.permission === 'view') || (user.permission === 'viewEmployee')) {
            return res.status(400).send("You are not authorized to do this");
        }

        const { circuit_cod } = req.body;
        if (await Circuit.findOne({ circuit_cod }))
            return res.status(400).send({ error: 'Circuit already exists' });

        let cont = req.body.containers;
        const circuit = await Circuit.findByIdAndUpdate(req.params.circuitId, {
            circuit_cod,
            containers: cont

        }, { new: true });

        await circuit.save();

        return res.send({ circuit });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating circuit' })
    }
});

router.delete('/:circuitId', async(req, res) => {
    const { token } = req.session
    const payload = jwt.verify(token, authToken.secret);
    const user = await User.findById(payload.id);

    if (!user) {
        return res.status(400).send("User not found");
    }

    if (user.permission !== 'admin') {
        return res.status(400).send("You are not authorized to do this");
    }

    let circuit = req.params.circuitId;
    let collections = await Circuit.find({ Circuit: circuit })
    if (collections[0]) {
        return res.status(400).send({ error: 'Circuit in collection' });
    } else {
        await Circuit.findByIdAndRemove(req.params.employeeId);
        return res.status(200).send({ error: 'Circuit Deleted' });
    }

});

module.exports = router;