const express = require('express');
const router = express.Router();
const bd = require('../bd/ligacao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authToken = require('../token/secret.json');
const Circuit = require('../models/circuit');
const User = require('../models/user');
const Container = require('../models/container');
const Collection = require('../models/collection');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middlewares/auth');




router.use(authMiddleware);

router.get('/', authMiddleware, async(req, res) => {
    try {

        const circuits = await Circuit.find().populate(['container']);
        return res.json(circuits);

    } catch (error) {
        return res.status(400).send({ error: 'Error loading circuits' })
    }
})

router.get('/:circuitId', authMiddleware, async(req, res) => {
    try {

        const circuit = await Circuit.findById(req.params.circuitId).populate(['container']);;
        return res.json({ circuit });

    } catch (error) {
        return res.status(400).send({ error: 'Error loading circuit' })
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
        const { name } = req.body;
        if (await Circuit.findOne({ name }))
            return res.status(400).send({ error: 'Employee already exists' });
        const _id = uuidv4();
        const circuit = await Circuit.create({...req.body, _id });
        return res.send({ circuit });


    } catch (err) {
        return res.status(400).send({ error: 'Error creating new circuit' });
    }
});

router.put('/:circuitId', authMiddleware, async(req, res) => {
    try {

        const { authorization } = req.headers
        const token = authorization.replace("Bearer ", "")
        const payload = jwt.verify(token, authToken.secret);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(400).send("Circuit not found");
        }

        if ((user.permission === 'view')) {
            return res.status(400).send("You are not authorized to do this");
        }

        let cont = req.body.containers;
        const circuit = await Circuit.findByIdAndUpdate(req.params.circuitId, {
            containers: cont

        }, { new: true });

        await circuit.save();

        return res.send({ circuit });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating circuit' })
    }
});

router.delete('/:circuitId', authMiddleware, async(req, res) => {
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

    let circuit = req.params.circuitId;
    let collections = await Collection.find({ Circuit: circuit })
    if (collections[0]) {
        return res.status(400).send({ error: 'Circuit in collection' });
    } else {
        await Circuit.findByIdAndRemove(req.params.employeeId);
        return res.status(200).send({ error: 'Circuit Deleted' });
    }

});

module.exports = router;