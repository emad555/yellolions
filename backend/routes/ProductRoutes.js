const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModel');

router.get(
    '/', 
    (req, res)=>{

        if(req.query.brand) {
            // Finding all products in DB and sending it to client
            ProductModel
            .find({brand: req.query.brand})
            .then(
                (document) => {
                    res.send(document)
                }
            )
            .catch(
                (e) => {
                    console.log('error', e);
                    res.send({ e: e })
                }
            )
        }
        else {
            // Finding all products in DB and sending it to client
            ProductModel
            .find()
            .then(
                (document) => {
                    res.send(document)
                }
            )
            .catch(
                (e) => {
                    console.log('error', e)
                }
            )
        }
    }
);

router.post(
    '/',
    (req, res) => {

        // data that will be saved in the collection
        const formData = {
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price
        };

        // instantiating an instance of ProductModel
        const newProduct = new ProductModel(formData);

        // save to databa
        newProduct
        .save()
        .then(
            (document) => {
                res.send(document);
            }
        )
        .catch(
            (e) => {
                console.log('e', e)
                res.send({e: e})
            }
        )

    }
);

module.exports = router;