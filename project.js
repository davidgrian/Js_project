const express = require('express');

const settings = require('./utils/config.js');
const authRouter = require('./routes/auth.js');
const productRouter = require('./routes/products.js');
const usersRouter = require('./routes/users.js');

const app = express();
app.use(express.json());
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/users', usersRouter);

app.listen(settings.PORT, () =>{
    console.log('Server is on');
})

