const express = require('express');
const usersRouter = express.Router();
const path = require('path');

const authenticateJWT = require('../middlewares/authenticateJWT');
const authorizeRole = require('../middlewares/authorizationRole');
const { readData} = require('../utils/fileStorage.js');

usersRouter.get('/', authenticateJWT, authorizeRole('admin'), (req, res) => {
    const users = readData(path.resolve('./data/users.json'));
    res.status(200).json(users);
});

module.exports = usersRouter;