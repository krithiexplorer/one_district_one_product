const express = require("express");
const  sellersRouter = express.Router();
const zod = require('zod');
const { Products, Sellers } = require("../db");
const jwt = require('jsonwebtoken');
const PASSWORD = "unchi";
const sellerSignupObj = require("../validate");
const { authMiddleware } = require("../middleware");


sellersRouter.post('/signup',async(req,res)=>{
    const user = req.body;
    const {success} = sellerSignupObj.safeParse(user);
    const existingUser = await Sellers.findOne({
        username:user.username
    })
    if(!success || existingUser){
        return  res.status(422).json({
            msg:"Email already taken / Incorrect inputs"
        })
    }
    const currentUser = await Sellers.create(user)
    const userId = currentUser._id;
    if(currentUser){
        const token = jwt.sign({userId},PASSWORD)
        res.status(200).json({
            msg:"user Created successfully",
            token:token
        })
    }
});

sellersRouter.post('/signin',async(req,res)=>{
    const user = req.body;
    const {success} = signinobj.safeParse(user);
    if(!success){
        return  res.status(422).json({
             msg:"Email already taken / Incorrect inputs"
         })
     }
    try {
        const existingUser =  await Sellers.findOne(user)
         const userId = existingUser._id;
         if(existingUser){
             const token = jwt.sign({userId},PASSWORD)
                 res.status(200).json({
                     id:userId,
                     token:token
                 })
         }
         else{
             return res.json({
                 msg:"user does not exist"
             })
         }
     } catch (error) {
         res.json({
             msg:"Error while logging in"
         })
     }
 
})

sellersRouter.post('/addProduct',authMiddleware,async(req,res)=>{
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

sellersRouter.get('/registeredId', authMiddleware, async (req, res) => {
    const userId = req.userId;

    try {
        const sellerRegisterId = await Sellers.findById(userId);
        return res.json({
            registeredId: sellerRegisterId
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


module.exports = sellersRouter;