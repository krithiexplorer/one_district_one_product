const express = require('express');
const stripeRouter = express.Router();
const { authMiddleware } = require('../middleware');
const { default: Stripe } = require('stripe');
const stripe = Stripe('sk_test_51Ou9vHSFYhTczrb57NBykYSEw0LO606o0tkM2KD78uRA9rJRGBVri8TEnW9xpwmCad8r9ccBEjixyT2hTGPR6U9E00MNCivQGE')

stripeRouter.post('/create-checkout-session',authMiddleware, async (req, res) => {

    const line_items = req.body.checkoutItems.map((item)=>{
        return { price_data : {
            currency: 'inr',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.qty,
        }
    })
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:5173/purchase-success',
      cancel_url: 'http://localhost:5173/cart',
    });
  
    res.json({
        url: session.url
    });
  });


  module.exports = stripeRouter