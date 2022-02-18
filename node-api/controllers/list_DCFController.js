const express = require('express');
const router = express.Router();
const List_DCF = require('../models/DDCCFF');
const bd = require('../bd/ligacao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authToken = require('../token/secret.json');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middlewares/auth');
// const { Collection } = require('mongoose');



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

        const list_DCFs = await List_DCF.find();
        return res.json(list_DCFs);

    } catch (error) {
        return res.status(400).send({ error: 'Error loading List_DCF' })
    }
})

router.get('/:list_DCFId', authMiddleware, async(req, res) => {
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
        const list_DCF = await List_DCF.findById(req.params.list_DCFId);
        return res.json({ list_DCF });

    } catch (error) {
        return res.status(400).send({ error: 'Error loading List_DCF' })
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


        // const { code } = req.body;
        // if (await list_DCF.findOne({ code }))
        // return res.status(400).send({ error: 'list_DCF already exists' });

        const _id = uuidv4();
        const list_DCF = await List_DCF.create({...req.body, _id });
        return res.send({ list_DCF });


    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error creating new list_DCF' });
    }
});

router.put('/:list_DCFId', authMiddleware, async(req, res) => {
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
        const { code, location } = req.body;
        const key = await List_DCF.findByIdAndUpdate(req.params.list_DCFId, {

            code,
            location
        }, { new: true });

        await key.save();

        return res.send({ key });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating List_DCF' })
    }
});

router.delete('/:list_DCFId', authMiddleware, async(req, res) => {
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
        await List_DCF.findByIdAndRemove(req.params.list_DCFId);

        return res.status(200).send({ message: 'List_DCF deleted' });
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting list_DCF' });
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