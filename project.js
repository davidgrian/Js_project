const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const settings = require('./utils/config.js');
const express = require('express');
const fs = require('fs');
const path = require('path');
const users = path.resolve('users.json');

const validateUserData = (userData) =>{
    if(!userData.username || !userData.password){
        throw new Error('You are not validated');
    }
}
const readData = (filename) => {
    const filepath = path.join(__dirname, filename);
    try {
        const data = fs.readFileSync(filepath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error('Something went wrong');
    }
}
const writedata = (filename, data)=>{
    const filepath = path.join(__dirname, filename);
    fs.writeFile(filepath, JSON.stringify(data),(err,data)=>{
        if(err){
            throw new Error('Something went wrong');
        }
    })
}
//Register /auth/register
//users.join => {
    // "name": "", "age", "email", "role": user
    //}
    //Login /auth/login
    // /users=> protected
const app = express();
app.use(express.json());

app.post('/auth/register', (req,res) =>{
    try{
    validateUserData(req.body);
    
    req.body.role = 'user'
    writedata('users.json', req.body);

    res.status(201).json('Successful registration!');
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
    
})

app.post('/auth/login', (req,res)=>{
    const {username, password} = req.body;

    const users = readData('users.json');
 
    const user = users.find(i => i.username === username)
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    if (bcrypt.compareSync(password, user.password) === false){
        return res.status(401).json({ message: 'Invalid password' });
    }
        

    const token = jwt.sign({ 
        name: user.name, 
        age: user.age, 
        email: user.email,
        role: user.role }, settings.secret_key);
    res.json({ token });
})


app.listen(settings.PORT, () =>{
    console.log('Server is on');
})