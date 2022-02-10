module.exports = (req, res, next) => {
    const authHeader = req.session.token;
    const jwt = require('jsonwebtoken');
    const authToken = require('../token/secret');
    console.log(authHeader)
    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    // s

    jwt.verify(authHeader, authToken.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid' });

        req.userId = decoded.id;
        return next();
    });
};