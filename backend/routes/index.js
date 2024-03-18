const express = require("express");
const rootRouter = express.Router();
const usersRouter = require('./users');
const sellersRouter = require('./seller');
const stripeRouter = require('./stripe');

rootRouter.use('/users',usersRouter);
rootRouter.use('/sellers',sellersRouter);
rootRouter.use('/payments',stripeRouter);

module.exports = rootRouter