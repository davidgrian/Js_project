require('dotenv').config();
const settings = {
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY
};

module.exports = settings;