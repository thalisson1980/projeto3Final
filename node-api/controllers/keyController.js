const express = require('express');
const router = express.Router();
const Key = require('../models/key');
const bd = require('../bd/ligacao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authToken = require('../token/secret.json');
const keyRequest = require('../models/keyRequest');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middlewares/auth');
// const { Collection } = require('mongoose');

// router.post('/', async(req, res) => {

//     try {

//         const _id = uuidv4();
//         const key = await Key.create({...req.body,_id });
//         return res.send({ key });

// // router.use(authMiddleware);

//     } catch (err) {
//         return res.status(400).send({ error: 'Error creating new Key' });
//     }
// });
router.use(authMiddleware);
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

        const keys = await Key.find().populate('status');
        return res.json(keys);

    } catch (error) {
        return res.status(400).send({ error: 'Error loading key' })
    }
})

router.get('/:keyId', authMiddleware, async(req, res) => {
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
        const key = await Key.findById(req.params.keyId);
        return res.json({ key });

    } catch (error) {
        return res.status(400).send({ error: 'Error loading key' })
    }
})


router.post('/', async(req, res) => {
    console.log(res.body)

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


        // const { id } = req.body;
        // if (await Key.findOne({ id }))
        //     return res.status(400).send({ error: 'Key already exists' });
        const _id = uuidv4();
        const admin = await Key.create({...req.body, _id });
        return res.send({ admin });


    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error creating new key' });
    }
});

router.put('/:keyId', authMiddleware, async(req, res) => {
    try {
        const { token } = req.session
        const payload = jwt.verify(token, authToken.secret);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(400).send("User not found");
        }

        if (user.permission !== 'view') {
            return res.status(400).send("You are not authorized to do this");
        }


        // let usuario = req.body.User;
        let keyReq = req.body.keyRequest;
        const { endDate, startDate } = req.body;
        const key = await Key.findByIdAndUpdate(req.params.keyId, {

            endDate,
            // user: usuario,
            startDate,
            status: keyReq

        }, { new: true });

        await key.save();

        return res.send({ key });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating employee' })
    }
});

router.delete('/:keyId', authMiddleware, async(req, res) => {
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
        await Key.findByIdAndRemove(req.params.keyId);

        return res.status(200).send({ message: 'User deleted' });
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting key' });
    }
    // let employee = req.params.employeeId;
    // let collections = await Collection.find({ Employees: employee })
    // if (collections[0]) {
    //     return res.status(400).send({ error: 'Employee in collection' });
    // } else {
    //     await Employee.findByIdAndRemove(req.params.employeeId);
    //     return res.status(200).send({ error: 'Employee Deleted' });
    // }

});

module.exports = router;