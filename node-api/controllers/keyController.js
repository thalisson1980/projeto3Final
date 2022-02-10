const express = require('express');
const router = express.Router();
const Key = require('../models/key');
const db = require('../bd/ligacao');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');

router.post('/', async(req, res) => {


    try {
       
        const _id = uuidv4();
        const key = await Key.create({...req.body,_id });
        return res.send({ key });


    } catch (err) {
        return res.status(400).send({ error: 'Error creating new container' });
    }
});


module.exports = router;