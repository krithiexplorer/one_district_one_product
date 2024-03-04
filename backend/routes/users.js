const express = require("express");
const usersRouter = express.Router();
const zod = require('zod');
const { Products, Users } = require("../db");
const jwt = require('jsonwebtoken');
const PASSWORD = "unchi";

const signupobj = zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(6)
})

usersRouter.post('/signup',async(req,res)=>{
    const user = req.body;
    const {success} = signupobj.safeParse(user);
    const existingUser = await Users.findOne({
        username:user.username
    })
    if(!success || existingUser){
        return  res.status(422).json({
            msg:"Email already taken / Incorrect inputs"
        })
    }
    const currentUser = await Users.create(user)
    const userId = currentUser._id;
    if(currentUser){
        const token = jwt.sign({userId},PASSWORD)
        res.status(200).json({
            msg:"user Created successfully",
            token:token
        })
    }
});

usersRouter.get('/products',async(req,res)=>{
    const products = await Products.find({});
    return res.json({
        products
    })
})

usersRouter.post('/addProduct',async(req,res)=>{
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

module.exports = usersRouter;
