const express = require("express");
const usersRouter = express.Router();
const { authMiddleware } = require("../middleware");
const { Products, Users } = require("../db");
const jwt = require('jsonwebtoken');
const {userSignupObj} = require("../validate");
const {signinobj} =  require("../validate");
const { startSession } = require("mongoose");
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
    const productsWithImages = products.map(product => {
        const imageUrl =  `data:image/jpeg;base64,${product.image.toString('base64')}`;
        return {
            ...product._doc,
            image:imageUrl
        }
    })
    console.log('Products with images:', productsWithImages);
    return res.json({
        products : productsWithImages
    })
})

usersRouter.get('/products/:productId',async(req,res)=>{
    const productId = req.params.productId;
    const product = await Products.findById(productId);
    const imageUrl =  `data:image/jpeg;base64,${product.image.toString('base64')}`;
    return res.json({
        product:{
            ...product._doc,
            image: imageUrl
        }
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
    const user = await Users.findById(userId)
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

    const cartTotal = () => {
        let price = 0;
    
        cartProducts.forEach((product) => {
            const productPrice = parseFloat(product.price);
    
            if (!isNaN(productPrice)) {
                price += productPrice;
            } else {
                console.error(`Invalid product price for product ID ${product.id}: ${product.price}`);
            }
        });
    
        return price;
    };
    

    res.json({
        products:cartProducts,
        cartTotal: cartTotal()
    })
})

usersRouter.get('/user_details',authMiddleware,async(req,res)=>{
    const userdetails = await Users.findById(req.userId);
    const details = {
        firstName : userdetails.firstName,
        username : userdetails.username
    }
    res.json({
        details
    })
})

usersRouter.post('/checkout/:productId',authMiddleware,async(req,res)=>{
    const productId = req.params.productId;
    const session = await startSession();
    const product = await Products.findById(productId).session(session);
    const quantity = product.quantity;
    if(quantity <= 0)
    {
        await session.abortTransaction();
        return res.status(400).json({
            msg:"Sorry, This product is sold out, indru poi nalai vaa"
        })
    }
    await Products.findByIdAndUpdate({productId},{$inc:{quantity: -1}}).session(session)
})

module.exports = usersRouter;
