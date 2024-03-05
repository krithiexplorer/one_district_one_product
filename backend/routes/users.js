const express = require("express");
const usersRouter = express.Router();

const { Products, Users } = require("../db");
const jwt = require('jsonwebtoken');
const userSignupObj = require("../validate");
const signinobj =  require("../validate");
const PASSWORD = "unchi";


usersRouter.post('/signup',async(req,res)=>{
    const user = req.body;
    const {success} = userSignupObj.safeParse(user);
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

usersRouter.post('/signin',async(req,res)=>{
    const user = req.body;
    const {success} = signinobj.safeParse(user);
    if(!success){
        return  res.status(422).json({
             msg:"Email already taken / Incorrect inputs"
         })
     }
    try {
        const existingUser =  await Users.findOne(user)
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


usersRouter.post('add_to_wishlist/',(req,res)=>{
    
})
module.exports = usersRouter;
