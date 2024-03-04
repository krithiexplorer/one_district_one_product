const express = require("express");
const  sellersRouter = express.Router();
const zod = require('zod');
const { Products, Sellers } = require("../db");
const jwt = require('jsonwebtoken');
const PASSWORD = "unchi";


sellersRouter.post('/addProduct',async(req,res)=>{
    const name = req.body.name;
    const price = req.body.price;
    const seller = req.body.seller;
    const image = req.body.image;
    const description = req.body.description;
    const offer = req.body.offer;
    const category = req.body.category;
    const district = req.body.district;

    const entry = await Products.create({
        name,
        price,
        seller,
        image,
        description,
        offer,
        category,
        district
    })
    if(entry){
        res.json({
            msg:"successful"
        })
    }
})


module.exports = sellersRouter;