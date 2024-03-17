const express = require("express");
const rootRouter = express.Router();
const usersRouter = require('./users');
const sellersRouter = require('./seller');
const stripeRouter = require('./stripe');
// const orderRouter = require('./order');

rootRouter.use('/users',usersRouter);
rootRouter.use('/sellers',sellersRouter);
rootRouter.use('/payments',stripeRouter);
// rootRouter.use('/orders',orderRouter);

module.exports = rootRouter