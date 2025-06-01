const express = require ('express');
const path = require('path');
const { readData, writeData } = require('../utils/fileStorage');
const productRouter = express.Router();
const role = require('../middlewares/authorizationRole');
const JWT = require('../middlewares/authenticateJWT')

productRouter.get('/', (req,res) => {
    const products = readData(path.resolve('./data/products.json'));
    res.json(products);
})
productRouter.get('/:id', (req,res) => {
    let product_id = req.params.id;
    const products = readData(path.resolve('./data/products.json'));
    const id = products.find(i=>i.id === product_id);
    if(!id){
        return res.status(400).send('No product with such ID');
    }
    res.json(id);
})

productRouter.post('/add', JWT, role('admin'), (req,res) => {
    const newProduct = req.body;
    const products = readData(path.resolve('./data/products.json'));
    products.push(newProduct);
    writeData(path.resolve('./data/products.json'), products);
    res.send('New product successfully added');
})
module.exports = productRouter;