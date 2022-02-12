const express = require('express');
const router = express.Router();
const bd = require('../bd/ligacao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authToken = require('../token/secret.json');
const Employee = require('../models/employee');
const User = require('../models/user');
const Collection = require('../models/collection');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middlewares/auth');
// const { Collection } = require('mongoose');



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

        const employees = await Employee.find();
        return res.json(employees);

    } catch (error) {
        return res.status(400).send({ error: 'Error loading employees' })
    }
})

router.get('/:employeeId', authMiddleware, async(req, res) => {
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
        const employee = await Employee.findById(req.params.employeeId);
        return res.json({ employee });

    } catch (error) {
        return res.status(400).send({ error: 'Error loading employee' })
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


        const { name } = req.body;
        if (await Employee.findOne({ name }))
            return res.status(400).send({ error: 'Employee already exists' });
        const _id = uuidv4();
        const employee = await Employee.create({...req.body, _id });
        return res.send({ employee });


    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error creating new employee' });
    }
});

router.put('/:employeeId', authMiddleware, async(req, res) => {
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
        const { name, adress, postalCode, occupation, permission } = req.body;
        const employee = await Employee.findByIdAndUpdate(req.params.employeeId, {

            name,
            adress,
            postalCode,
            occupation,
            permission
        }, { new: true });

        await employee.save();

        return res.send({ employee });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating employee' })
    }
});

router.delete('/:employeeId', authMiddleware, async(req, res) => {
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
        await Employee.findByIdAndRemove(req.params.employeeId);

        return res.status(200).send({ message: 'User deleted' });
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting user' });
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