const express = require("express");
const usersRouter = express.Router();
const { authMiddleware } = require("../middleware");
const { Products, Users, Orders } = require("../db");
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
    if(!success){
        return  res.status(422).json({
            msg:"Incorrect inputs"
        })
    }
    if(existingUser){
        return res.status(409).json({
            msg:"user already exists"
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


usersRouter.get('/products', async (req, res) => {
    try {
      const products = await Products.find({});
      const productsWithImages = products.map(product => {
        const imageUrl = `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`;
        
        return {
          ...product._doc,
          image: imageUrl
        }
      });
      
      //console.log('Products with images:', productsWithImages);
      return res.json({ products: productsWithImages });
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  

usersRouter.get('/products/:productId',async(req,res)=>{
    const productId = req.params.productId;
    const product = await Products.findById(productId);
    const imageUrl =  `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`;
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

    const wishlistedWithImages = wishlisted.map(product => {
        const imageUrl = `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`;
        
        return {
          ...product._doc,
          image: imageUrl
        }
      });

    res.json({
        products:wishlistedWithImages
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

usersRouter.delete('/cart/:productId', authMiddleware, (req, res) => {
    const productId = req.params.productId;
    const userId = req.userId;
    Users.updateOne({ _id: userId }, {
        "$pull": {
            cartProducts: productId
        }
    }).then(() => {
        res.json({
            msg: "Product removed from cart successfully"
        });
    }).catch((err) => {
        console.error("Error removing product from cart:", err);
        res.status(500).json({ error: "Internal server error" });
    });
});

usersRouter.delete('/wishlist/:productId', authMiddleware, (req, res) => {
    const productId = req.params.productId;
    const userId = req.userId;
    Users.updateOne({ _id: userId }, {
        "$pull": {
            wishlistedProducts: productId
        }
    }).then(() => {
        res.json({
            msg: "Product removed from wishlist successfully"
        });
    }).catch((err) => {
        console.error("Error removing product from wishlist:", err);
        res.status(500).json({ error: "Internal server error" });
    });
});

usersRouter.get('/viewcart',authMiddleware, async(req,res)=>{
    const userId = req.userId;
    const user = await Users.findById(userId);
    const cartProducts = await Products.find({
        _id:{
            "$in":user.cartProducts
        }
    })

    const cartWithImages = cartProducts.map(product => {
        const imageUrl = `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`;
        
        return {
          ...product._doc,
          image: imageUrl
        }
      });
    res.json({
        products:cartWithImages
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
usersRouter.get('/orders', authMiddleware, async (req, res) => {
    try {
        const orders = await Orders.find({ userId: req.userId });
        if (!orders) {
            return res.status(404).json({ message: 'No orders found' });
        }

        const productIds = orders.flatMap(order => order.products.map(product => product.productId));
        const productQuantity = orders.flatMap(order => order.products.map(product => product.quantity));
        
        const userproducts = await Promise.all(productIds.map(async (productId) => {
            const product = await Products.findById(productId);
            if (!product) {
                console.log(`Product not found for productId: ${productId}`);
                return null;
            }
            return product;
        }));

        const formattedProducts = userproducts.map(product => {
            if (!product) {
                return null;
            }
            const imageUrl = `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`;
            return {
                _id:product._id,
                name: product.name,
                image: imageUrl
            };
        }).filter(product => product !== null);

        res.json({formattedProducts,productQuantity});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = usersRouter;
