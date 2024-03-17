const express = require('express');
const stripeRouter = express.Router();
const { authMiddleware } = require('../middleware');
const { default: Stripe } = require('stripe');
const { Orders, Users, Products } = require('../db');
const stripe = Stripe('sk_test_51Ou9vHSFYhTczrb57NBykYSEw0LO606o0tkM2KD78uRA9rJRGBVri8TEnW9xpwmCad8r9ccBEjixyT2hTGPR6U9E00MNCivQGE')

stripeRouter.post('/create-checkout-session',authMiddleware, async (req, res) => {
    const customer = await stripe.customers.create({
      metadata:{
        userId: req.userId,
        cart:JSON.stringify(req.body.checkoutItems)
      }
    })
    const line_items = req.body.checkoutItems.map((item)=>{
        return { price_data : {
            currency: 'inr',
            product_data: {
              name: item.name,
              metadata:{
                id:item.id
              }
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
      customer:customer.id,
      line_items,
      mode: 'payment',
      success_url: `http://localhost:5173/purchase-success`,
      cancel_url: 'http://localhost:5173/cart',
    });
  
    res.json({
        url: session.url
    });
});

async function createOrder(customer, data)
{
    const Items = JSON.parse(customer.metadata.cart);
    const products = Items.map(item => ({
      productId: item.id,
      quantity: item.qty
    }));
    const newOrder = await Orders.create({
      userId: customer.metadata.userId,
      customerId: data.customer,
      paymentId: data.payment_intent,
      products:products
    })
    if(newOrder)
    {
      console.log(newOrder)
    }
}

async function updateProductTable(customer){
  const Items = JSON.parse(customer.metadata.cart);
    const products = Items.map(item => ({
      productId: item.id,
      quantity: item.qty
    }));
    const updatePromises = products.map(async (product) => {
      await Products.updateOne(
        { _id: product.productId },
        { $inc: { quantity: -product.quantity } }
      );
      console.log("Product quantity updated");
    });

    await Promise.all(updatePromises);  

}

async function emptyCart(customer){
  const userId = customer.metadata.userId;
  await Users.updateOne({ _id: userId }, { $set: { cartProducts: [] } });
}

let endpointSecret = "whsec_8a4a4a6f59be410d0ad73ac2bafb70a2a55bd6a28f3ca2576a22c987634816c9";

stripeRouter.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  let data;
  let eventType;

  const payload = req.body;
  const payloadString = JSON.stringify(payload, null, 2);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret
  });
  if(endpointSecret)
  {
    let event;
    const sig = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    } catch (err) {
      console.log(err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object;
    eventType = event.type;
  }
  else{
    data = req.body.data.object;
    eventType = req.body.type;
  }

  if(eventType === "checkout.session.completed")
  {
      stripe.customers.retrieve(data.customer).then((customer)=>{
        createOrder(customer, data);
        updateProductTable(customer);
        emptyCart(customer);
      }).catch((err)=>{
        console.log(err.message);
      })
  }
  res.send(200).end();
});



module.exports = stripeRouter