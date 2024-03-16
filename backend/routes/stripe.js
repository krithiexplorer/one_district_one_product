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
          quantity: item.qty
        }
    })
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "KE","IN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "inr",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "inr",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
      line_items,
      mode: 'payment',
      success_url: `http://localhost:5173/purchase-success`,
      cancel_url: 'http://localhost:5173/cart',
    });
  
    res.json({
        url: session.url
    });
});


module.exports = stripeRouter