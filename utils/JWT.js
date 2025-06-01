const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const settings = require('./config.js');

const hashing = (password) => bcrypt.hashSync(password, 10);
const comparing = (inputPassword, hashedPassword) =>{
    return bcrypt.compareSync(inputPassword, hashedPassword);
}
const tokenGen = (user) => {
    return jwt.sign({
        name: user.name,
        age: user.age,
        email: user.email,
        role: user.role
    }, settings.SECRET_KEY, { expiresIn: '1h' });
};

module.exports = { hashing, comparing, tokenGen };