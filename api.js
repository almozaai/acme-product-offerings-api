const app = require('express').Router();
const db = require('./db');
const { Product, Company, Offering } = db.models;


app.get('/companies', async(req, res, next) => {
    Company.findAll()
        .then(companies => res.send(companies))
        .catch(next)
})

app.get('/products', async(req, res, next) => {
    Product.findAll()
        .then(products => res.send(products))
        .catch(next)
})

app.get('/offerings', async(req, res, next) => {
    Offering.findAll()
        .then(offerings => res.send(offerings))
        .catch(next)
})

module.exports = app;