const express = require("express");
const rootRouter = express.Router();
const usersRouter = require('./users');
const sellersRouter = require('./seller');

rootRouter.use('/users',usersRouter);
rootRouter.use('/sellers',sellersRouter);

module.exports = rootRouter