const express = require("express");
const  sellersRouter = express.Router();
const zod = require('zod');
const { Products, Sellers } = require("../db");
const jwt = require('jsonwebtoken');
const PASSWORD = "unchi";
const {sellerSignupObj, signinobj} = require("../validate");
const { authMiddleware } = require("../middleware");
const multer = require('multer');
const upload = multer();


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
            seller:true,
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
                     seller:true,
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

sellersRouter.post('/addProduct',authMiddleware, upload.single('image'), async(req,res)=>{
    const name = req.body.name;
    const price = req.body.price;
    const seller = req.body.seller;
    const image = req.file;
    const description = req.body.description;
    const offer = req.body.offer;
    const category = req.body.category;
    const district = req.body.district;
    const quantity = req.body.quantity;

    const entry = await Products.create({
        name,
        price,
        seller,
        image: {
            data: image.buffer,
            contentType: image.mimetype,
          },
        description,
        offer,
        category,
        district,
        quantity
    })
    if(entry){
        res.status(201).json({ message: 'Product uploaded successfully' });
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

sellersRouter.get('/details',authMiddleware,async(req,res)=>
{
    const userId = req.userId;
    const detailsOfSeller = await Sellers.findById(userId);
    const details = {
        seller: detailsOfSeller.firstName,
        district: detailsOfSeller.district
    }
    return res.json({
        details
    })
})

sellersRouter.get('/seller_details',authMiddleware,async(req,res)=>{
    const sellerdetails = await Sellers.find({_id:req.userId});
    const details = {
        firstName : sellerdetails.firstName,
        username : sellerdetails.username
    }
    return res.json({
        details
    })
})



module.exports = sellersRouter;