const express = require('express');
const router = express.Router();
const bd = require('../bd/ligacao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authToken = require('../token/secret.json');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middlewares/auth');



function generateToken(params = {}) {
    return jwt.sign(
        params, authToken.secret, {
            expiresIn: 86400,
        });
}

router.get('/', authMiddleware, async(req, res) => {
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
        const users = await User.find();
        return res.json(users);

    } catch (error) {
        return res.json({ error: 'Error loading users' });
    }
})

router.get('/:userId', authMiddleware, async(req, res) => {
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
        const user_id = await User.findById(req.params.userId);
        res.json({ user_id });

    } catch (error) {
        return res.status(400).send({ error: 'Error loading user' })
    }
})


router.post('/', async(req, res) => {
    try {
        const { email } = req.body.email;
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists' });
       
         const _id = uuidv4();
        const user = await User.create({...req.body, _id });
        user.password = undefined;


        return res.send({

            user,
            token: generateToken({ id: user.id }),

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

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: "Invalid password" });
        }
        user.password = undefined;

        res.json({
            message: "sucesso",
            token: generateToken({ id: user._id }),
        });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Registration failed' });
    }
});


router.put('/:userId', authMiddleware, async(req, res) => {
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

        const { userId, permission } = req.body;
        const admin = await User.findByIdAndUpdate(req.params.userId, {
            userId,
            permission
        }, { new: true });

        return res.send({ admin });

    } catch (err) {
        return res.status(400).send({ error: 'Error updating user' })
    }
});

router.delete('/:userId', authMiddleware, async(req, res) => {
    try {
        const { authorization } = req.headers
        const token = authorization.replace("Bearer ", "")
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


// const express = require('express');
// const router = express.Router();
// const user = require('../models/user');
// const bcrypt = require('bcryptjs');


// router.get('/',async (req,res)=>{
//     try {

//         const users = await user.find();
//         res.json(users);

//     }catch(error){
//         res.json({message:error})
//     }
// })

// router.post('/',async (req,res) =>{
//     const User = new user({
//         name: req.body.nome,
//         email: req.body.email,
//         password:req.body.password

//     });

//     try{
//         const resultado = await User.save();
//         res.json(resultado);
//     }catch(error){
//         res.json({message : error});
//     }


// }); 

// router.post('/login',async (req,res)=>{
//     try{

//         var query1 = { email: req.body.email };
//         var query2 = { email: req.body.email,password:req.body.password };


//         const User1 =  await user.findOne(query1) ;     
//         if(User1){

//             const User2 =  await user.findOne(query2) ; 
//             if(User2){
//                 res.json({message: "sucesso"});
//             }else{

//                 res.json({message: "password incorreta"});
//             }
//         }else{
//             res.json({message: "email nao existe"});
//         }

//     }catch(err){
//         console.log("what2")
//         res.json({message:err})
//     }

// });

module.exports = router;