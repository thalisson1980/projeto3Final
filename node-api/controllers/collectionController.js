const express = require('express');
const router = express.Router();
const bd = require('../bd/ligacao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authToken = require('../token/secret.json');
const User = require('../models/user');
const Collection = require('../models/collection');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middlewares/auth');


// router.use(authMiddleware);

router.get('/', async(req, res) => {
    try {
        const { token } = req.session
        const payload = jwt.verify(token, authToken.secret);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(400).send("User not found");
        }

        if (user.permission === 'view') {
            return res.status(400).send("You are not authorized to do this");
        }

        const collections = await Collection.find().populate(['employees']).populate('circuit');
        return res.json(collections);

    } catch (error) {
        return res.status(400).send({ error: 'Error loading collections' })
    }
})

router.get('/:collectionId', async(req, res) => {
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
        const collection = await Collection.findById(req.params.collectionId).populate(['employees']).populate('circuit').populate('[containers]');;
        return res.json({ collection });

    } catch (error) {
        return res.status(400).send({ error: 'Error loading collection' })
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
        const container = await Collection.create({...req.body, _id });
        return res.send({ container });


    } catch (err) {
        return res.status(400).send({ error: 'Error creating new collection' });
    }
});

router.put('/:collectionId', authMiddleware, async(req, res) => {
    try {

        const { token } = req.session
        const payload = jwt.verify(token, authToken.secret);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(400).send("User not found");
        }

        if (user.permission === 'view') {
            return res.status(400).send("You are not authorized to do this");
        }

        let emp = req.body.Employee;
        let circ = req.body.Circuit;

        const { dateStartTime, dateEndTime, massaCollect_kg } = req.body;
        const collections = await Collection.findByIdAndUpdate(req.params.collectionId, {
            employees: emp,
            circuit: circ,
            dateStartTime,
            dateEndTime,
            massaCollect_kg
        }, { new: true });

        await collections.save();

        return res.send({ collections });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating collection' })
    }
});

router.delete('/:collectionId', authMiddleware, async(req, res) => {
    try {
        const { token } = req.session
        const payload = jwt.verify(token, authToken.secret);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(400).send("User not found");
        }

        if (user.permission !== 'admin') {
            return res.status(400).send("You are not authorized to do this");
        }

        await Collection.findByIdAndRemove(req.params.collectionId);
        return res.status(200).send({ message: 'Collection deleted' });

    } catch (err) {
        return res.json({ error: 'Error deleting collection' });
    }
});

module.exports = router;