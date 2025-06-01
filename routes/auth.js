const express = require('express');
const { readData, writeData } = require('../utils/fileStorage.js');
const { hashing, comparing, tokenGen } = require('../utils/JWT.js');
const { validateUserData } = require('../utils/validations.js');
const authRouter = express.Router();
const path = require ('path');
authRouter.post('/register',
 (req,res) =>{
    try{
    validateUserData(req.body);
    let users = readData(path.resolve('./data/users.json'));
     if (users.find(user => user.username === req.body.username)){
        return res.status(409).json({message: 'User already exist.'});
    }
    
    const newUser = {
        ...req.body,
        password: hashing(req.body.password),
        role: 'user'
        };

    users.push(newUser);
    writeData(path.resolve('./data/users.json'), users);

    res.status(201).json({message: 'Successful registration!'});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
    
})

authRouter.post('/login', (req,res)=>{
    const {username, password} = req.body;
    const users = readData(path.resolve('./data/users.json'));

    const user = users.find(i => i.username === username)
    if (!user) {
        return res.status(401).json({message: 'User not found'});
    }
    if (!comparing(password, user.password)){
        return res.status(401).json({ message: 'Incorrect password.' });
    }
    const token = tokenGen(user);
    res.json({"token": token});
})

module.exports = authRouter;