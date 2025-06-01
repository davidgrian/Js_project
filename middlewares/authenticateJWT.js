const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const SECRET = process.env.SECRET_KEY;

function authenticateJWT(req, res, next) {
    const headerpars = req.headers.Authorization;
    if (!headerpars) {
        return res.status(401).send('Error related to token');
    }

    const token = headerpars.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).send('Invalid token');
    }
}

module.exports = authenticateJWT;