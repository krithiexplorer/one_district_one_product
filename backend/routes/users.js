const express = require("express");
const usersRouter = express.Router();
const { authMiddleware } = require("../middleware");
const { Products, Users } = require("../db");
const jwt = require('jsonwebtoken');
const {userSignupObj} = require("../validate");
const {signinobj} =  require("../validate");
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
        const token = jwt.sign(userId,PASSWORD)
        res.status(200).json({
            seller:false,
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
                     seller:false,
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

usersRouter.put('/wishlist/:productId', authMiddleware, (req, res) => {
    const productId = req.params.productId;
    const userId = req.userId;
    Users.updateOne({_id : userId},{
        "$push": {
            wishlistedProducts: [productId]
        }
    }).then(()=>{
        res.json({
            msg:"course purchase success"
        })
    })
});

usersRouter.get('/viewwishlist',authMiddleware, async(req,res)=>{
    const userId = req.userId;
    const user = await Users.findOne({_id:userId})
    const wishlisted = await Products.find({
        _id:{
            "$in":user.wishlistedProducts
        }
    })

    res.json({
        products:wishlisted
    })
})

usersRouter.put('/cart/:productId', authMiddleware, (req, res) => {
    const productId = req.params.productId;
    const userId = req.userId;
    Users.updateOne({_id : userId},{
        "$push": {
            cartProducts: [productId]
        }
    }).then(()=>{
        res.json({
            msg:"course purchase success"
        })
    })
});

usersRouter.get('/viewcart',authMiddleware, async(req,res)=>{
    const userId = req.userId;
    const user = await Users.findOne({_id:userId})
    const cartProducts = await Products.find({
        _id:{
            "$in":user.cartProducts
        }
    })

    res.json({
        products:cartProducts
    })
})

module.exports = usersRouter;
