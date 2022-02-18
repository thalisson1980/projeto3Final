const express = require('express');
const router = express.Router();
const bd = require('../bd/ligacao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authToken = require('../token/secret.json');
const User = require('../models/user');
const Key = require('../models/key');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middlewares/auth');

// router.use(authMiddleware);

function generateToken(params = {}) {
    return jwt.sign(
        params, authToken.secret, {
            expiresIn: 86400,
        });
}

router.get('/', authMiddleware, async(req, res) => {
    try {

        //Verificar oermissoes de user pelo cookie
        const { token } = req.session
        const payload = jwt.verify(token, authToken.secret);
        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(400).send("User not found");
        }

        if (user.permission !== 'admin') {
            return res.status(400).send("You are not authorized to do this");
        }
        const users = await User.find();
        return res.json(users);

    } catch (error) {
        return res.json({ error: 'Error loading users' });
    }
})

router.get("/logout", async(req, res) => {
    try {
        req.session = null;
        res.send("logout")
    } catch (error) {
        console.log(error)
    }

})

router.get('/:userId', authMiddleware, async(req, res) => {
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

            const usuario = await User.findById(req.params.userId);
            console.log({ usuario })
            return res.json({ usuario });

        } catch (error) {
            return res.status(400).send({ error: 'Error loading user' })
        }
    })
    // router.get('/:userId', authMiddleware, async(req, res) => {
    //     try {

//         const user_id = await User.findById(req.params.userId);
//         const chaves = await Key.find({ user: user_id._id });

//         let userKey;
//         let existe = false;
//         for (const chave of chaves) {
//             if (chave.ativo == true) {
//                 userKey = chave
//                 existe = true;
//             }
//         }
//         if (!existe) {
//             userKey = "No valid key"
//         }
//         res.json({ user_id, userKey });

//     } catch (error) {
//         return res.status(400).send({ error: 'Error loading user' })
//     }
// })


router.post('/', async(req, res) => {

    console.log(req.body)

    try {
        const { email } = req.body;
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists' });
        const _id = uuidv4();
        const user = await User.create({...req.body, _id });

        user.password = undefined;
        const token = generateToken({ id: user.id })
        req.session = { cookie: token }
        return res.send({

            user,
            token: token,

        });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});


router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).send({ error: "User not found" });
        }
        const validar = await bcrypt.compare(password, user.password)
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: "Invalid password" });
        }
        user.password = undefined;
        const token = generateToken({ id: user.id })
        req.session = { token: token }
        res.json({
            permission: user.permission,
            message: "sucesso",
            token: token,
        });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Registration failed' });
    }
});


router.put('/:userId', authMiddleware, async(req, res) => {
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

        const { name, email, key, permission } = req.body;
        const users = await User.findByIdAndUpdate(req.params.userId, {

            name,
            email,
            key,
            permission
        }, { new: true });
        await user.save();

        return res.send({ users });

    } catch (err) {
        return res.status(400).send({ error: 'Error updating user' })
    }
});

router.delete('/:userId', authMiddleware, async(req, res) => {
    try {
        const { token } = req.session

        const payload = jwt.verify(token, authToken.secret);
        const user = await User.findById(payload.id);
        console.log(user)
        if (!user) {
            return res.status(400).send("User not found");
        }

        if (user.permission !== 'admin') {
            return res.status(400).send("You are not authorized to do this");
        }
        await User.findByIdAndRemove(req.params.userId);

        return res.status(200).send({ message: 'User deleted' });
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting user' });
    }
});

module.exports = router;